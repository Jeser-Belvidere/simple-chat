import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFound'
import AuthPage from 'pages/Auth'

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
