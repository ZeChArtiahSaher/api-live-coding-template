import axios from 'axios'

export default {
  async getData(limit: number) {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=${limit}`)

    return data
  }
}
