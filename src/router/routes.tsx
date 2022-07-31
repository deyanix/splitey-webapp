import { RouteObject } from 'react-router-dom';
import AuthenticationLayout from '../layout/Authentication/AuthenticationLayout';
import MainLayout from '../layout/Main/MainLayout';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import DashboardPage from '../pages/DashboardPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

export default [
	{
		element: <MainLayout />,
		children: [{ path: '/', element: <DashboardPage /> }],
	},
	{
		element: <AuthenticationLayout />,
		children: [
			{ path: '/signin', element: <SignInPage /> },
			{ path: '/signup', element: <SignUpPage /> },
			{ path: '/reset-password', element: <ResetPasswordPage /> },
		],
	},
] as RouteObject[];
