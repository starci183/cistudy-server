import { IInput } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword, Length } from "class-validator"

export class SignInData {
  @IsEmail()
  @ApiProperty()
  	email: string
    
  @IsStrongPassword()
  @Length(6, 20)
  @ApiProperty()
  	password: string
}

export class SignInInput implements IInput<SignInData> {
	data: SignInData
}
