import React, { useCallback, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from './CurrentUserContext';
import { AuthenticationResult } from 'src/api/Auth/AuthModels';
import { CurrentUser } from 'src/api/User/UserModels';
import UserService from 'src/api/User/UserService';
import _ from 'lodash';
import AuthService from 'src/api/Auth/AuthService';
import useStoredAuth from 'src/hooks/useStoredAuth';
import api from 'src/api';
import { useNavigate } from 'react-router-dom';
import { options } from 'src/router/routes';

export const CurrentUserProvider: React.FC<React.PropsWithChildren> = (
	props
) => {
	const [user, setUser] = useState<CurrentUser>();
	const [authResult, setAuthResult] = useState<AuthenticationResult>();
	const [interceptorId, setInterceptorId] = useState<number>();
	const [initializing, setInitializing] = useState<boolean>(false);
	const [initialized, setInitialized] = useState<boolean>(false);
	const { storedAuth, setStoredAuth, clearStoredAuth } = useStoredAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setInitializing(true);
		load().finally(() => {
			setInitializing(false);
			setInitialized(true);
		});
	}, []);

	const setBothResult = useCallback(
		(result: AuthenticationResult | undefined): void => {
			if (_.isNumber(interceptorId)) {
				console.log('EJECT12!!!!', interceptorId);
				api.interceptors.request.eject(interceptorId);
				setInterceptorId(undefined);
			}
			if (result) {
				const localInterceptorId = api.interceptors.request.use(
					(request) => {
						_.merge(request.headers, {
							Authorization: `Bearer ${result.accessToken}`,
						});
						return request;
					}
				);
				console.log('implement', localInterceptorId);
				setInterceptorId(localInterceptorId);
			}

			setAuthResult(result);
			setStoredAuth(_.omit(result, 'accessToken'));
		},
		[interceptorId]
	);

	const refreshToken = useCallback(async (token: string): Promise<void> => {
		setBothResult(await AuthService.refresh(token));
		setUser(await UserService.getCurrent());
	}, []);

	const load = useCallback(async (): Promise<void> => {
		if (!_.isNil(storedAuth)) {
			await refreshToken(storedAuth.refreshToken);
		}
	}, []);

	const refresh = useCallback(async (): Promise<void> => {
		if (!_.isNil(authResult)) {
			await refreshToken(authResult.refreshToken);
		}
	}, []);

	const login = useCallback(
		async (
			login: string,
			password: string,
			rememberMe: boolean
		): Promise<void> => {
			setBothResult(
				await AuthService.login({
					login,
					password,
					rememberMe,
					deviceUuid: authResult?.deviceUuid,
				})
			);
			setUser(await UserService.getCurrent());
			navigate(options.defaultAuthorizedRoute);
		},
		[authResult]
	);

	const logout = useCallback(async (): Promise<void> => {
		if (!_.isNil(authResult)) {
			await AuthService.invalidate(authResult.refreshToken);
			setBothResult(undefined);
			setUser(undefined);
			clearStoredAuth();
			navigate(options.defaultGuestRoute);
		}
	}, [authResult]);

	return (
		<CurrentUserContext.Provider
			value={{
				user,
				authResult,
				initializing,
				initialized,
				load,
				refresh,
				login,
				logout,
			}}
		>
			<Preloader showing={initializing} />
			{initialized && props.children}
		</CurrentUserContext.Provider>
	);
};