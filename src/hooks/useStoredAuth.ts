import _ from 'lodash';
import { AuthenticationResult } from 'src/api/Auth/AuthModels';
import { useCallback } from 'react';

export const AUTHENTICATION_RESULT_KEY = 'splitey_authentication_result';
export type StoredAuthenticationResult = Partial<
	Omit<AuthenticationResult, 'accessToken'>
>;

export default function () {
	const setStoredAuth = useCallback(
		(result: StoredAuthenticationResult): void => {
			localStorage.setItem(
				AUTHENTICATION_RESULT_KEY,
				JSON.stringify(result)
			);
		},
		[]
	);

	const getStoredAuth = useCallback(():
		| StoredAuthenticationResult
		| undefined => {
		const resultString = localStorage.getItem(AUTHENTICATION_RESULT_KEY);
		return !_.isNil(resultString) ? JSON.parse(resultString) : undefined;
	}, []);

	const clearStoredAuth = useCallback((): void => {
		localStorage.removeItem(AUTHENTICATION_RESULT_KEY);
	}, []);

	return {
		setStoredAuth,
		getStoredAuth,
		clearStoredAuth,
	};
}
