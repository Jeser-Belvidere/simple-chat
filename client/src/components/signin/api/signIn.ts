import { userData } from '..'
import { Request } from '@shared/fetch'

export default async function signInAPI(userData: userData) {
	await Request.post('auth/login', userData)
}
