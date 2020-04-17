import morgan from 'morgan';
import tracer from 'tracer';
import { REPORTS_CONFIG } from './constants';

export const reportsList = Object.entries(REPORTS_CONFIG).map(([key, value]) => {
	console.log(value.name, key);
	const report = {
		text: value.name,
		value: key,
	};
	return report;
});

export const log = (() => {
	const logger = tracer.colorConsole();
	logger.requestLogger = morgan('dev');
	return logger;
})();

export const normalizePort = (val) => {
	const port = parseInt(val, 10);
	if (Number.isNaN(port)) return val;
	if (port >= 0) return port;
	return false;
};

export const delay = (time) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});

export const wishMe = async () => {
	const today = new Date();
	const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	const hr = today.getHours();
	let wishingText = '';
	if (hr >= 0 && hr < 12) {
		wishingText = 'Good Morning!';
	} else if (hr == 12) {
		wishingText = 'Good Noon!';
	} else if (hr >= 12 && hr <= 17) {
		wishingText = 'Good Afternoon!';
	} else {
		wishingText = 'Good Evening!';
	}
	return wishingText;
};

export const greeting = async (userName) => {
	return `Bingo, ${userName}, I am ready with interest below 😍`;
};
