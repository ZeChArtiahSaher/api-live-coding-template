import * as request from 'supertest'
import * as rawApp from '../src/app'

const app = rawApp.callback()

describe('Events controller', () => {
  describe('get events endpoint', () => {
    it('should return 200 status', async () => {
      const response = await request(app).get('/events')
        .expect(200)
    })
  })
})
