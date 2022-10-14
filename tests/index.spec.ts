import * as request from 'supertest'
import * as rawApp from '../src/app'

const app = rawApp.callback()

describe('Index controller', () => {
  describe('getData endpoint', () => {
    it('should return 200 status', async () => {
      const response = await request(app).get(`/resource?limit=5`)
        .expect(200)
    })
  })
})
