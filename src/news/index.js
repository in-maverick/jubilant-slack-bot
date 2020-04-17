import axios from 'axios';
import { newAPI, newsAPIKey } from '../constants';
import { postChatMessage } from '../fileUploader';
import { delay, greeting } from '../utils';

export const getTopStories = async (options = {}, { slackReqObj }) => {
	try {
		console.log('slackReqObj', slackReqObj.user.name);
		const greet = await greeting(slackReqObj.user.name);
		const newsTopHeads = `${newAPI}top-headlines?country=in&sortBy=popularity&apiKey=${newsAPIKey}`;
		const resNewsTop = await axios.get(newsTopHeads);

		const articlesArr = 'articles' in resNewsTop.data ? resNewsTop.data.articles : {};

		let count = 0;
		let newsLines = '';
		let dateString = '';
		for (const article of articlesArr.splice(0, 10)) {
			dateString = 'publishedAt' in article ? article.publishedAt : Date.now();
			var dateTime = new Date().toString(dateString).split(' ');
			dateString = `${dateTime[0]}, ${dateTime[1]} ${dateTime[2]} ${dateTime[3]}`;

			newsLines = `☞ *Headline No. ${++count}*\n_${article.title}_ \n${article.description}\n${
				article.url
			}\n\ngetHubPanel${newsLines}`;
		}
		const message = {
			responseUrl: slackReqObj.response_url,
			replaceOriginal: false,
			text: greet + '\n' + newsLines,
			mrkdwn: true,
			mrkdwn_in: ['text'],
		};
		return postChatMessage(message).catch((ex) => {
			log.error(ex);
		});
	} catch (error) {
		console.error(error);
	}
};
