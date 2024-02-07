import { IInput } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export class InitInput implements IInput<string>  {
  @IsUUID("4")
  @ApiProperty()
  	data: string
}
