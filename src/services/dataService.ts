import axios from 'axios'

export default {
  async getData() {
    const { data } = await axios.get('https://opentdb.com/api.php?amount=10')

    return data
  }
}
