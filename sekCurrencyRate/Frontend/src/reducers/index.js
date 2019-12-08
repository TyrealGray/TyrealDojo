import { combineReducers } from 'redux';
import authInfo from './authInfo';
import modalInfo from './modalInfo';
import countriesInfo from './countriesInfo';
import conversionInfo from './conversionInfo';

export default combineReducers({
	authInfo,
	modalInfo,
	countriesInfo,
	conversionInfo,
});
