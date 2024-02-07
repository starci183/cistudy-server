import { ConflictException, Controller, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { UserMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { FirebaseService, MailerService, Sha256Service } from "@global"
import { InitInput, SignInInput, SignUpInput, VerifyGoogleAccessTokenInput } from "./shared"
import {  UserKind } from "@common"

@Controller()
export default class AuthService {
	constructor(
    @InjectRepository(UserMySqlEntity)
    private readonly userMySqlRepository: Repository<UserMySqlEntity>,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    private readonly firebaseService: FirebaseService
	) {}

	async signIn(input: SignInInput): Promise<UserMySqlEntity> {
		const { data } = input
		const found = await this.userMySqlRepository.findOneBy({
			email: data.email,
		})
		if (!found) throw new NotFoundException("User not found.")
		if (!this.sha256Service.verifyHash(data.password, found.password))
			throw new UnauthorizedException("Invalid credentials.")
		return found
	}

	async signUp(input: SignUpInput): Promise<string> {
		const { data } = input
  	const found = await this.userMySqlRepository.findOne({
  		where: {
  			email: data.email,
  		},
  	})
  	if (found) {
  		throw new ConflictException(
  			`User with email ${data.email} has existed.`,
  		)
  	}
  	data.password = this.sha256Service.createHash(data.password)
  	const created = await this.userMySqlRepository.save(data)

  	await this.mailerService.sendMail(created.userId, data.email)
  	return `An user with id ${created.userId} has been created`
	}

	async init(input: InitInput): Promise<UserMySqlEntity> {
		const { data } = input
  	return await this.userMySqlRepository.findOneBy({
  		userId: data,
  	})
	}

	async verifyGoogleAccessToken(input: VerifyGoogleAccessTokenInput): Promise<UserMySqlEntity> {
		const { data } = input
  	const decoded = await this.firebaseService.verifyGoogleAccessToken(data)
  	if (!decoded)
  		throw new UnauthorizedException("Invalid Google access token.")
  	let found = await this.userMySqlRepository.findOneBy({
  		externalId: decoded.uid,
  	})
  	if (!found) {
  		found = await this.userMySqlRepository.save({
  			externalId: decoded.uid,
  			email: decoded.email,
  			avatarUrl: decoded.picture,
  			phoneNumber: decoded.phone_number,
  			kind: UserKind.Google,
  		})
  	}
  	return found
	}
}