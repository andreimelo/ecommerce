import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './library/common/store';
import { Provider } from 'react-redux';
import { refreshSession } from './library/services/auth';
import { shouldAttemptSessionRefresh } from './library/helpers/auth/session';

const originalFetch = window.fetch.bind(window);

window.fetch = async (input, init = {}) => {
	const requestInit = {
		...init,
		// credentials : 'include',
	};

	const response = await originalFetch(input, requestInit);

	if (shouldAttemptSessionRefresh(input, requestInit, response)) {
		const refreshed = await refreshSession();
		if (refreshed && refreshed.ok) {
			return originalFetch(input, {
				...requestInit,
				__isRetry : true,
			});
		}
	}

	return response;
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
