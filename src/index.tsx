import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { setConfig } from 'react-hot-loader';

setConfig({ ErrorOverlay: () => null });

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
);
