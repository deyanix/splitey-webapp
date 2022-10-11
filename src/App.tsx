import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { AppRouter } from 'src/router';
import './i18n';
import { ThemeProvider } from 'src/components/ThemeProvider/ThemeProvider';
import Preloader from 'src/components/Preloader/Preloader';
import { CurrentUserProvider } from 'src/components/CurrentUserContext/CurrentUserProvider';

const App = () => {
	return (
		<>
			<Suspense fallback={<Preloader showing={true} />}>
				<ThemeProvider>
					<CurrentUserProvider>
						<AppRouter />
					</CurrentUserProvider>
				</ThemeProvider>
			</Suspense>
		</>
	);
};

export default hot(App);
