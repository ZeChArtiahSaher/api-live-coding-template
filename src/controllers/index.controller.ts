import { Context } from 'koa';
import { UserDto } from '@/dto/user.dto'
import { Dto, InputArg, ContextArg } from '@/base/decorators'
import { Controller } from '@/base/controller'

export default class IndexController extends Controller {
  public static async getData(@ContextArg() ctx: Context) {
    const data = {}

    ctx.status = 200
    ctx.body = { data }
  }
  
  @Dto(UserDto, ctx => ctx?.request?.body)
  public static async setUser(
    @InputArg(UserDto) userDto: UserDto,
    @ContextArg() ctx: Context) {
    console.log(userDto)

    ctx.status = 200
    ctx.body = {"hi": "hi"}
  }
}
