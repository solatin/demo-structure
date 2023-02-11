import { registerLicense, validateLicense } from '@syncfusion/ej2-base';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import store, { persistor } from '$store';
import React from 'react';
import App from './App';
import '$i18n';
const license = 'ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRjX39YcXRWQGVUU0Y=';

validateLicense(license) && registerLicense(license);

const root = createRoot(document.querySelector('#root'));
const Root = () => (
	<BrowserRouter>
		<StoreProvider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<App />
			</PersistGate>
		</StoreProvider>
	</BrowserRouter>
);

root.render(<Root />);
