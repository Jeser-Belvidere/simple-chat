import { NotFoundPage } from 'pages/NotFound'
import AuthPage from 'pages/Auth'
import ChatPage from 'pages/Chat'

export type availableRoutes = '/' | '/*' | '/auth'

export const routesMeta = {
	'/': { isAuthRequired: true },
	'/auth': { isAuthRequired: false },
	'/*': { isAuthRequired: false },
}

export const routes = [
	{
		path: '/',
		element: <ChatPage />,
	},
	{
		path: '/auth',
		element: <AuthPage />,
	},
	{
		path: '/*',
		element: <NotFoundPage />,
	},
]
