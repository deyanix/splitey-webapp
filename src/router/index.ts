import {
	RouteObject,
	useLocation,
	useMatch,
	useMatches,
	useNavigate,
	useRoutes,
} from 'react-router-dom';
import routes, { options } from './routes';
import { useEffect } from 'react';
import { useCurrentUser } from 'src/components/CurrentUserContext/CurrentUserContext';
import _ from 'lodash';

export interface AppRouterOptions {
	defaultGuestRoute: string;
	defaultAuthorizedRoute: string;
	guestRoutes: string[];
}

export function AppRouter() {
	const { user, initialized } = useCurrentUser();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (initialized) {
			if (
				_.isNil(user) &&
				!options.guestRoutes.includes(location.pathname)
			) {
				navigate(options.defaultGuestRoute);
			} else if (
				!_.isNil(user) &&
				options.guestRoutes.includes(location.pathname)
			) {
				navigate(options.defaultAuthorizedRoute);
			}
		}
	}, [location, user, initialized]);

	return useRoutes(routes);
}

export { routes };
