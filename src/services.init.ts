import { JwtService } from '@/services/jwt.service'
import { DataService } from '@/services/data.service'

export interface Services {
  jwtService: JwtService
  dataService: DataService
}

export const initServices = async() => {
  const services: Services = {
    jwtService: new JwtService(),
    dataService: new DataService()
  }
  
  await Promise.all(
    Object.values(services).map(s => s.init()))
    
  return services
}

