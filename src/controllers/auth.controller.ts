import { Context } from 'koa';
import { Dto, InputArg, ContextArg } from '@/base/decorators'
import { Controller } from '@/base/controller'

import { ByPasswordDto } from '@/dto/auth.by-password.dto';

export default class AuthController extends Controller {
  @Dto(ByPasswordDto, ctx => ctx?.request?.body)
  public static async byPassword(
    @InputArg(ByPasswordDto) byPassword: ByPasswordDto,
    @ContextArg() ctx: Context) {
      console.log(byPassword)
  }
}