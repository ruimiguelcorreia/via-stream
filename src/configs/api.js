import environmentDev from './environment.dev.json';
import environmentProd from './environment.prod.json';

const getAPI = () => {
	const { hostname } = window.location;
	const isDevelopmentEnv = hostname === 'localhost' || hostname === '127.0.0.1';
	return isDevelopmentEnv ? environmentDev.api : environmentProd.api;
};

export default getAPI();
