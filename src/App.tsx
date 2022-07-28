import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { AppRouter } from './router';
import './i18n';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import Preloader from './components/Preloader/Preloader';

const App = () => {
	return (
		<>
			<Suspense fallback={<Preloader />}>
				<ThemeProvider>
					<AppRouter />
				</ThemeProvider>
			</Suspense>
		</>
	);
};

export default hot(App);
