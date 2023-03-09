import decode from 'jwt-decode'

interface IDecodedToken {
	exp: number
	iat: number
	id: number
	username: string
}

interface IToken {
	isExpired: boolean
	id: number
	username: string
}

export function decodeToken(token: string): IToken {
	const { exp, iat, id, username } = decode<IDecodedToken>(token)

	return {
		id,
		username,
		isExpired: iat > exp,
	}
}
