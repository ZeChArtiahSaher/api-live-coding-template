import * as jwt from 'jsonwebtoken'
import { Service } from '@/base/service'

const crypto = require('crypto');

export class JwtService extends Service {
  privateKey: string
  publicKey: string

  constructor() {
    super()
    this.privateKey = null
    this.publicKey = null
  }
  
  async init() {
    console.log('gen random key')
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        }
    });
    
    this.privateKey = privateKey
    this.publicKey = publicKey
  }
  
  sign(payload, opts = {}) {
    return jwt.sign(payload, this.privateKey, { 
      algorithm: 'RS256',
      expiresIn: '1h',
      ...opts
    });
  }
  
  verifyAndDecode(payload) {
    return jwt.verify(payload, this.privateKey) 
  }
}