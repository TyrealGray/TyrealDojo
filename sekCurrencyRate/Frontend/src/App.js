import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { login } from './actions/authActions';
import './App.css';
import AmountCheck from './containers/AmountCheck';
import QueryCountryModal from './containers/QueryCountryModal';
import CountriesTable from './containers/CountriesTable';

const store = configureStore();

function App() {
	useEffect(() => {
		store.dispatch(login());
	}, []);

	return (
		<Provider store={store}>
			<div className="App">
				<AmountCheck />
				<CountriesTable />
				<QueryCountryModal />
			</div>
		</Provider>
	);
}

export default App;
