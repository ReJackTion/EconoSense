import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL
const API_ENDPOINT = '/indicators/all_indicators/'

const getIndicators = async (country: string, start_date?: string, end_date?:string): Promise<any> => {
    
    var request_url = `${BACKEND_URL}${API_ENDPOINT}${country}`

    if(start_date){
        request_url =  `${request_url}?start_date=${start_date}` 
    }
    if(end_date){
        request_url =  `${request_url}?end_date=${end_date}` 
    }
    if(start_date && end_date){
        request_url =  `${request_url}?start_date=${start_date}&end_date=${end_date}` 
    }

    const res = await axios.get(request_url)
    return res.data
  }

  const getMonthIndicators = async (query: string): Promise<any> => {
    
    const request_url = `${BACKEND_URL}${API_ENDPOINT}${query}`

    const res = await axios.get(request_url)
    return res.data
  }
  
  const Indicator_API = {
    getIndicators,
    getMonthIndicators
  }
  
  export default Indicator_API