import { appConfig, jwtConfig, servicesConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { createTransport } from "nodemailer"
import { TokenType } from "@common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export default class MailerService {
    constructor(private readonly jwtService: JwtService) {}

    private transporter = createTransport({
        service: "gmail",
        auth: {
            user: servicesConfig().mailer.user,
            pass: servicesConfig().mailer.pass,
        },
    })

    private mailOptions = (userId: string, email: string) => {
        const appUrl = appConfig().url
        const token = this.jwtService.sign(
            { userId, type: TokenType.Verify },
            { secret: jwtConfig().secret },
        )
        return {
            from: servicesConfig().mailer.user,
            to: email,
            subject: "REGISTRATION CONFIRMATION - CISTUDY",
            html: `
			<p>Dear ${email},</p>
			<p>To complete your registration, please click on the confirmation link below:</p>
			<a href="${appUrl}/auth/verify-registration?&token=${token}">Here</a>
			<p>If you did not sign up for CiStudy, you can ignore this email.</p>
			<p>Best regards,</p>
			<p>Tu Cuong</p>
			<p>C.E.O of CiStudy</p>`,
        }
    }

    async sendMail(userId: string, email: string) {
        return await this.transporter.sendMail(this.mailOptions(userId, email))
    }
}
  