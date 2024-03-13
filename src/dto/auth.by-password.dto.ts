import { IsString, MinLength } from 'class-validator'

export class ByPasswordDto {
  @IsString()
  @MinLength(3)
  username: string
  
  @IsString()
  password: string
}