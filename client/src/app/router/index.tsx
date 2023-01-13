import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from 'pages/Auth'
import { NotFoundPage } from 'pages/NotFound'

const Router = createBrowserRouter([
	{
		path: '/auth',
		element: <AuthPage />,
	},
	{
		path: '/*',
		element: <NotFoundPage />,
	},
])

export default Router
