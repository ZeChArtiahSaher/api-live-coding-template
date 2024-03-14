import * as request from 'supertest'
import * as rawApp from '../src/app'
import { describe } from 'node:test'
import { Wrap } from '../src/base/controller'

const app = rawApp.callback()

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

  describe('elevated user', () => {
    it('auth by password endpoint', async () => {
      const response1 = await request(app)
        .post('/auth/by-password')
        .send({ username: 'user', password: 'pwd' })
        .expect(200)
        
      expect(response1.text).not.toBe("")
    })
        
    it('fails with no token', async () => {
      const response2 = await request(app)
        .post('/user-elevated')
        .send({ name: 'test' })
        .expect(401)
    })

    it('works with token', async () => {
      const response1 = await request(app)
        .post('/auth/by-password')
        .send({ username: 'user', password: 'pwd' })
        .expect(200)

      const token = response1.text

      const response2 = await request(app)
        .post('/user-elevated')
        .send({ name: 'test' })
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
    })
  })
})