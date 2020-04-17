export const SPOTIFY_GLOBAL_VIRAL = 'https://spotifycharts.com/regional/global/daily/latest/download';

export const SPOTIFY_IN_VIRAL = 'https://spotifycharts.com/viral/in/daily/latest/download';

export const newsAPIKey = '3f66d409aebf4933bff2ccee8d793cd9';
export const newAPI = 'http://newsapi.org/v2/';

export const coronaUpdateIN = 'https://toibnews.timesofindia.indiatimes.com/ncov19/india_states_data.json';

export const coronaUpdateGlobeWHO =
	'https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/COVID_19_CasesByCountry(pt)_VIEW/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ADM0_NAME%2Ccum_conf%2Ccum_death%2CID&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=true&returnM=true&quantizationParameters=&sqlFormat=none&f=pjson';

export const coronaUpdateGlobeTOI = 'https://toibnews.timesofindia.indiatimes.com/TOIBNews/coronaextloader.htm';

export const REPORTS_CONFIG = {
	newsHeadlines: {
		name: 'Top Headlines',
		namePrefix: 'newsHeadlines',
	},
	coronaUpdatesIN: {
		name: 'Covid-19 (India)',
		namePrefix: 'coronaUpdatesIN',
	},
	coronaUpdatesGlobe: {
		name: 'Covid-19 (World)',
		namePrefix: 'coronaUpdatesGlobe',
	},
	spotifyViral: {
		name: 'Spotify Top Tracks',
		namePrefix: 'spotifyViral',
	},
};
