import { IInput } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsJWT } from "class-validator"

export class VerifyGoogleAccessTokenInput implements IInput<string> {
  @IsJWT()
  @ApiProperty()
  	data: string
}
