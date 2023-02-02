import { userData } from '..'
import { Request } from '@shared/api'

export default async function signUp(userData: userData) {
	await Request.post('users', userData)
}
