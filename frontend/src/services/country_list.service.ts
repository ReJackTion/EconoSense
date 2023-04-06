import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL
const API_ENDPOINT = '/indicators/all_country_list'

const getCountryList = async (query: string): Promise<any> => {
    const res = await axios.get(`${BACKEND_URL}${API_ENDPOINT}`)
    return res.data
  }
  
  const CountryList = {
    getCountryList,
  }
  
  export default CountryList