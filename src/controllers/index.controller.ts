import { Context } from 'koa';
import { UserDto } from '@/dto/user.dto'
import { Dto, DtoInputArg, ContextArg } from '@/base/decorators'
import { Controller } from '@/base/controller'
import { DataService } from '@/services/data.service'
import { UseUser, UserArg } from '@/decorators/user'

export default class IndexController extends Controller {
  constructor(
    private readonly dataService: DataService
  ) { 
    super()
  }

  public async getData(@ContextArg() ctx: Context) {
    const data = await this.dataService.getData()

    ctx.status = 200
    ctx.body = { data }
  }
  
  @Dto(UserDto, ctx => ctx?.request?.body)
  public async setUser(
    @DtoInputArg(UserDto) userDto: UserDto,
    @ContextArg() ctx: Context) {

    ctx.status = 200
    ctx.body = {"hi": "hi"}
  }

  @Dto(UserDto, ctx => ctx?.request?.body)
  @UseUser()
  public async setUserAuthorized(
    @DtoInputArg(UserDto) userDto: UserDto,
    @UserArg() user,
    @ContextArg() ctx: Context) {

    console.log(user)
    ctx.status = 200
    ctx.body = {"hi": "hi"}
  }
}
