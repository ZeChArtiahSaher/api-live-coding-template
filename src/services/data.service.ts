import axios from 'axios'
import { Service } from '@/base/service'

export class DataService extends Service {
  async getData() {
    const { data } = await axios.get('https://opentdb.com/api.php?amount=10')
    console.log(data)

    return data
  }
}