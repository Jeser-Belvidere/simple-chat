import { userData } from '..'
import { Request } from '@shared/fetch'

export default async function signUp(userData: userData) {
	await Request.post('users', userData)
}
