import { RouteObject } from 'react-router-dom';
import AuthenticationLayout from '../layout/Authentication/AuthenticationLayout';
import MainLayout from '../layout/Main/MainLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

export default [
	{
		element: <MainLayout />,
		children: [{ path: '/', element: <DashboardPage /> }],
	},
	{
		element: <AuthenticationLayout />,
		children: [{ path: '/login', element: <LoginPage /> }],
	},
] as RouteObject[];
