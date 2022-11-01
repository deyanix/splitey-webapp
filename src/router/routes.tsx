import { RouteObject } from 'react-router-dom';
import AuthenticationLayout from '../layout/Authentication/AuthenticationLayout';
import MainLayout from '../layout/Main/MainLayout';
import SignInPage from '../pages/Authentication/SignInPage';
import SignUpPage from '../pages/Authentication/SignUpPage';
import TransferCreatePage from '../pages/Transfer/TransferCreatePage';
import ResetPasswordPage from '../pages/Authentication/ResetPasswordPage';
import { AppRouterOptions } from 'src/router/index';
import FriendsPage from 'src/pages/Friend/Friends/FriendsPage';
import FriendInvitationsPage from 'src/pages/Friend/FriendInvitations/FriendInvitationsPage';
import AddUserFriendPage from 'src/pages/Friend/AddUserFriend/AddUserFriendPage';
import AddExternalFriendPage from 'src/pages/Friend/AddExternalFriend/AddExternalFriendPage';
import SettlementsPage from 'src/pages/Settlement/Settlements/SettlementsPage';
import EditExternalFriendPage from 'src/pages/Friend/EditExternalFriend/EditExternalFriendPage';

export const options: AppRouterOptions = {
	defaultAuthorizedRoute: '/settlements',
	defaultGuestRoute: '/signin',
	guestRoutes: ['/signin', '/signup', '/reset-password'],
};

export default [
	{
		element: <MainLayout />,
		children: [
			{ path: '/friends', element: <FriendsPage /> },
			{
				path: '/friends/invitations',
				element: <FriendInvitationsPage />,
			},
			{
				path: '/friends/add-user',
				element: <AddUserFriendPage />,
			},
			{
				path: '/friends/:friendId/edit',
				element: <EditExternalFriendPage />,
			},
			{
				path: '/friends/add-external',
				element: <AddExternalFriendPage />,
			},
			{
				path: '/settlements',
				element: <SettlementsPage />,
			},
			{
				path: '/settlements/create-transfer',
				element: <TransferCreatePage />,
			},
		],
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
