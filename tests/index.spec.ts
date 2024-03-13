import * as request from 'supertest'
import * as rawApp from '../src/app'
import { describe } from 'node:test'
import { Wrap } from '../src/base/controller'

const app = rawApp.callback()

describe('base, controller, coverage', () => {
  expect(Wrap({
    value: 'abc'
  }).value).toEqual('abc')
})

describe('Index controller', () => {
  describe('getData endpoint', () => {
    it('should return 200 status', async () => {
      const response = await request(app).get('/resource')
        .expect(200)
    })
  })

  describe('setUser endpoint', () => {
    it('should return 200 status', async () => {
      const response = await request(app)
        .post('/user')
        .send({ name: 'test' })
        .expect(200)
    })

    it('should fail on garbage input', async () => {
      const response1 = await request(app)
        .post('/user')
        .send({ name: 'test', extrafluff: 123 })
        
      expect(response1.status).not.toEqual(200)

      const response2 = await request(app)
        .post('/user')
        .send({ name: 'test', extrafluff: 123 })

      expect(response2.status).not.toEqual(200)
    })
  })
})