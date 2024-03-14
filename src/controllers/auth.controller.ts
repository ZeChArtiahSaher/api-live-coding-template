import { Context } from 'koa';
import { 
  Dto, DtoInputArg, ContextArg 
} from '@/base/decorators'
import { Controller } from '@/base/controller'

import { ByPasswordDto } from '@/dto/auth.by-password.dto';
import { JwtService } from '@/services/jwt.service'

export default class AuthController extends Controller {
  constructor(
    private readonly jwtService: JwtService
    ) { 
    super()
  }

  @Dto(ByPasswordDto, ctx => ctx?.request?.body)
  public async byPassword(
    @DtoInputArg(ByPasswordDto) byPassword: ByPasswordDto,
    @ContextArg() ctx: Context) {

      ctx.body = this.jwtService.sign({
        byPassword
      })
  }
}