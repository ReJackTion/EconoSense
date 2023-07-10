import axios from 'axios'
import crypto from 'crypto'

const API_URL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL

const config = {
    headers: {
      'accept': 'application/json'
    }
  }

const register = async (
  email: string,
  password: string,
  first_name?: string,
  surname?: string,
  email_notification: boolean = true,
): Promise<any> => {
  interface RegisterBody {
    first_name?: string
    surname?: string
    email: string
    email_notification?: boolean
    password: string
  }

  const post_body = {
    first_name: first_name ?? "",
    surname: surname ?? "",
    email: email,
    email_notification: email_notification ?? true,
    password: password,
  } as RegisterBody

  const response = await axios.post(`${API_URL}/auth/signup`, post_body)
  return response?.data?.ok && response?.data
}

const login = async (
  email: string,
  password: string
): Promise<any> => {
  interface LoginBody {
    email: string
    password: string
  }

  const post_body = new URLSearchParams({
    'grant_type': '',
    'username': email,
    'password': password,
    'scope': '',
    'client_id': '',
    'client_secret': ''
  })

  const response = await axios.post(`${API_URL}/auth/login`, post_body, config)

  

  if (response?.data?.ok) {
    // const userProfile = await getProfile(response.data.data.jwt)

    // if (userProfile) {
    //   return {
    //     token: response.data.data.jwt,
    //     user: userProfile,
    //     email: userProfile.user._email,
    //     phone: userProfile.user._phone,
    //     name: userProfile.user.name,
    //     image: userProfile.user._phone,
    //   }
    // }

    const userProfile = await getProfile(response.data.accessToken)

    return {
            accessToken: response.data.accessToken,
            userProfile: userProfile
          }
  } else {
    return null
  }
}

const checkUserExists = async (email: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/h/auth/?email=${email}`)
  return response.data.data.ok
}

const getTAC = async (
  email: string,
  phone: string,
  debug: boolean
): Promise<any> => {
  interface GetTAC_Body {
    email: string
    phone: string
    debug: boolean
  }

  const post_body = {
    email: email,
    phone: phone,
    debug: debug,
  } as GetTAC_Body

  const response = await axios.post(`${API_URL}/h/auth/`, post_body)

  return response.data.data
}

const verifyTAC = async (tac: string): Promise<any> => {
  interface VerifyTAC_Body {
    tac: string
  }

  const post_body = {
    tac: tac,
  } as VerifyTAC_Body

  const response = await axios.put(`${API_URL}/h/auth/`, post_body)

  return response.data.data
}

const verifyJWT = async (jwt: string): Promise<any> => {
  interface VerifyJWT_Body {
    jwt: string
  }

  const post_body = {
    jwt: jwt,
  } as VerifyJWT_Body

  const response = await axios.put(`${API_URL}/h/auth/`, post_body, config)

  return response.data.data
}

const changePassword = async (
  jwt: string,
  password: string,
  email: string,
  phone: string,
  loginMethod: 'email' | 'phone'
): Promise<any> => {
  interface ChangePassword_Body {
    jwt: string
    password: string
  }

  let hash = ''

  if ((email = '' || null)) {
    hash = crypto
      .createHash('sha256')
      .update(`${phone}${password}`)
      .digest('hex')
  } else {
    hash = crypto
      .createHash('sha256')
      .update(`${email}${password}`)
      .digest('hex')
  }

  const post_body = {
    jwt: jwt,
    password: hash,
  }

  const response = await axios.put(`${API_URL}/h/auth`, post_body, config)

  return response.data.data
}

const getProfile = async (jwt: string): Promise<any> => {
  const config_jwt = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }
  const response = await axios.get(`${API_URL}/auth/me`, config_jwt)

  return response.data
}

const auth = {
  register,
  login,
  checkUserExists,
  getTAC,
  verifyTAC,
  verifyJWT,
  changePassword,
  getProfile,
}

export default auth
