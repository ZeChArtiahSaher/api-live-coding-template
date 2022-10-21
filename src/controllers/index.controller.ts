import { Context } from 'koa';
import dataService from '../services/dataService'

export default class IndexController {
  public static async getData(ctx: Context) {
    const result = await dataService.getData()

    ctx.status = 200
    ctx.body = result
  }
}
