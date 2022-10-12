import { hot } from 'react-hot-loader/root';
import React from 'react';
import { AppRouter } from 'src/router';
import './i18n';
import { ThemeProvider } from 'src/components/ThemeProvider/ThemeProvider';
import { CurrentUserProvider } from 'src/components/CurrentUserContext/CurrentUserProvider';

const App = () => {
	return (
		<>
			<ThemeProvider>
				<CurrentUserProvider>
					<AppRouter />
				</CurrentUserProvider>
			</ThemeProvider>
		</>
	);
};

export default hot(App);
