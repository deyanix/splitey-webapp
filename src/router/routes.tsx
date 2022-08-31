import { RouteObject } from 'react-router-dom';
import AuthenticationLayout from '../layout/Authentication/AuthenticationLayout';
import MainLayout from '../layout/Main/MainLayout';
import SignInPage from '../pages/Authentication/SignInPage';
import SignUpPage from '../pages/Authentication/SignUpPage';
import DashboardPage from '../pages/Transfer/TransferCreatePage';
import ResetPasswordPage from '../pages/Authentication/ResetPasswordPage';

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
