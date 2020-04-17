import { topTenList } from '../spotify';
import { getTopStories } from '../news';
import { coronaUpdatesIN, coronaUpdatesGlobe } from '../corona';

export const functionSelector = async (eventName) => {
	let selectFunction;
	switch (eventName) {
		case 'spotifyViral':
			selectFunction = topTenList;

			break;

		case 'newsHeadlines':
			selectFunction = getTopStories;

			break;

		case 'coronaUpdatesIN':
			selectFunction = coronaUpdatesIN;

			break;

		case 'coronaUpdatesGlobe':
			selectFunction = coronaUpdatesGlobe;

			break;

		default:
			break;
	}
	return selectFunction;
};
