import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { AppRouter } from './router';
import './i18n';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import Loading from './components/Loading/Loading';

const App = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<ThemeProvider>
					<AppRouter />
				</ThemeProvider>
			</Suspense>
		</>
	);
};

export default hot(App);
