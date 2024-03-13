import { JwtService } from '@/services/jwt.service'
import { DataService } from '@/services/data.service'

export const bindServices = async() => {
  const services = [new JwtService(), new DataService()]
  
  return await Promise.all(services.map(s => s.init))
}

