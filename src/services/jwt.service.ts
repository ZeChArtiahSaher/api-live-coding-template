import jwt from 'jsonwebtoken'
import { Service } from '@/base/service'

export class JwtService extends Service {
  privateKey: string

  constructor() {
    super()
    this.privateKey = 'blahblah'
  }
  
  sign(payload, opts = {}) {
    jwt.sign(payload, this.privateKey, { 
      algorithm: 'RS256',
      expiresIn: '1h',
      ...opts
    });
  }
  
  verify(payload) {
    jwt.verify(payload, this.privateKey) 
  }
}