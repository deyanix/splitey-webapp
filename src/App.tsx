import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { AppRouter } from './router';
import './i18n';

const App = () => {
	return (
		<>
			<Suspense fallback="loading">
				<AppRouter />
			</Suspense>
		</>
	);
};

export default hot(App);
