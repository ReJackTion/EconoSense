import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL
const API_ENDPOINT = '/indicators/all/'

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

  const getMonthIndicators = async (country: string, start_date?: string, end_date?:string): Promise<any> => {
    
    const monthIndex = String(new Date().getMonth()-1).padStart(2, '0');
    const yearIndex = new Date().getFullYear();
    const request_url = `${BACKEND_URL}${API_ENDPOINT}${country}?start_date=${yearIndex}-${monthIndex}-01&end_date=${yearIndex}-${monthIndex}-01`

    const res = await axios.get(request_url)
    return res.data
  }
  
  const Indicator_API = {
    getIndicators,
    getMonthIndicators
  }
  
  export default Indicator_API