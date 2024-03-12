import { Context } from 'koa';
import dataSource from '../db/data-source'
import { Event } from '../entities/event';

export default class EventsController {
  public static async getEvents(ctx: Context) {
    const eventRepository = dataSource.getRepository(Event)

    const events = await eventRepository.find()

    ctx.status = 200
    ctx.body = events
  }
}
