import { routesMeta, availableRoutes } from './routes'
import { decodeToken } from '@shared/utils/decodeToken'

export function checkRoute(routeToNavigate: availableRoutes): boolean {
	const isRequiredAuth = routesMeta[routeToNavigate].isAuthRequired

	if (!isRequiredAuth) {
		return true
	}

	const token = localStorage.getItem('accessToken')

	if (!token) return false

	const { isExpired } = decodeToken(token)

	if (isExpired) {
		return false
	}

	return true
}
