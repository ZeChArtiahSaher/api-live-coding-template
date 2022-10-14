import { Context } from 'koa';
import dataService from '../services/dataService'

export default class IndexController {
  public static async getData(ctx: Context) {
    const limit: number = Number(ctx.query.limit || 5)

    const result = await dataService.getData(limit)

    ctx.status = 200
    ctx.body = result
  }
}
