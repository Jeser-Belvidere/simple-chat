import { userData } from '..'
import { Request } from '@shared/api'

interface ISigninResponse {
	accessToken: string
	refreshToken: string
}

export default async function signInAPI(userData: userData) {
	return await Request.post<userData, ISigninResponse>('auth/login', userData)
}
