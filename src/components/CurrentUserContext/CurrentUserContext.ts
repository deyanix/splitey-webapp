import React from 'react';
import { CurrentUser } from 'src/api/User/UserModels';
import { AuthenticationResult } from 'src/api/Auth/AuthModels';

export interface CurrentUserConsumer {
	user: CurrentUser | undefined;
	authResult: AuthenticationResult | undefined;
	initializing: boolean;
	initialized: boolean;
	load: () => Promise<void>;
	refresh: () => Promise<void>;
	login: (
		login: string,
		password: string,
		rememberMe: boolean
	) => Promise<void>;
	logout: () => Promise<void>;
}

export const CurrentUserContext = React.createContext<CurrentUserConsumer>({
	user: undefined,
	authResult: undefined,
	initializing: false,
	initialized: false,
	load: async () => {},
	refresh: async () => {},
	login: async () => {},
	logout: async () => {},
});

export function useCurrentUser(): CurrentUserConsumer {
	return React.useContext(CurrentUserContext);
}
