import { RouteObject } from 'react-router-dom';
import AuthenticationLayout from '../layout/Authentication/AuthenticationLayout';
import MainLayout from '../layout/Main/MainLayout';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import DashboardPage from '../pages/DashboardPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import TestPage from '../pages/TestPage';
import TestFormikPage from '../pages/TestFormikPage';

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
			{ path: '/test', element: <TestPage /> },
			{ path: '/test/formik', element: <TestFormikPage /> },
		],
	},
] as RouteObject[];
