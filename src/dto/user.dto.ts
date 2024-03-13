import { IsString } from 'class-validator'

export class UserDto {
  @IsString()
  public name: string
}