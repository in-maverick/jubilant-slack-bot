import axios from 'axios';
import { coronaUpdateIN, coronaUpdateGlobeWHO, coronaSlogan } from '../constants';
import { postChatMessage } from '../fileUploader';
import { delay, greeting } from '../utils';

export const coronaUpdatesIN = async (options = {}, { slackReqObj }) => {
	try {
		console.log('slackReqObj', slackReqObj.user.name);
		const greet = await greeting(slackReqObj.user.name);
		const resCoronaUpdate = await axios.get(coronaUpdateIN);

		const totalCases = 'total' in resCoronaUpdate.data ? resCoronaUpdate.data.total : {};

		let stateWise = 'state_wise' in resCoronaUpdate.data ? resCoronaUpdate.data.state_wise : {};

		const onDate = 'lpt' in resCoronaUpdate.data ? resCoronaUpdate.data.lpt : new Date.now();

		stateWise = stateWise.sort(function (a, b) {
			return parseFloat(b.Confirmed) - parseFloat(a.Confirmed);
		});

		let stateDataString = '*State  |  Confirmed  |  Deaths*';

		stateDataString = `${stateDataString}\n*_Total (IND)_ | ${totalCases.Confirmed} | ${totalCases.Deaths}*`;

		for (const inState of stateWise) {
			stateDataString = `${stateDataString}\n_${inState.State.replace('\n', '').trim()}_ | *${inState.Confirmed}* | ${
				inState.Deaths
			}`;
		}

		stateDataString = `${stateDataString}\n\n_${coronaSlogan}_\nUpdated on ${onDate}`;

		const message = {
			responseUrl: slackReqObj.response_url,
			replaceOriginal: false,
			text: greet + '\n\n' + stateDataString,
			mrkdwn: true,
			mrkdwn_in: ['text'],
		};
		await delay(250);
		return postChatMessage(message).catch((ex) => {
			log.error(ex);
		});
	} catch (error) {
		console.error(error);
	}
};

export const coronaUpdatesGlobe = async (options = {}, { slackReqObj }) => {
	try {
		console.log('slackReqObj', slackReqObj.user.name);
		const greet = await greeting(slackReqObj.user.name);
		const resCoronaUpdate = await axios.get(coronaUpdateGlobeWHO);
		let resDataArr = resCoronaUpdate.data.features;
		let countryDataArr = [];
		let worldTotalConf = 0;
		let worldTotalDeaths = 0;
		for (const key in resDataArr) {
			if (resDataArr.hasOwnProperty(key)) {
				worldTotalConf = worldTotalConf + resDataArr[key].attributes.cum_conf;
				worldTotalDeaths = worldTotalDeaths + resDataArr[key].attributes.cum_death;
				countryDataArr.push({
					State: resDataArr[key].attributes.ADM0_NAME,
					Confirmed: resDataArr[key].attributes.cum_conf,
					Deaths: resDataArr[key].attributes.cum_death,
				});
			}
		}
		countryDataArr.push({
			State: 'globe',
			Confirmed: worldTotalConf,
			Deaths: worldTotalDeaths,
		});
		countryDataArr = countryDataArr.sort(function (a, b) {
			return parseFloat(b.Confirmed) - parseFloat(a.Confirmed);
		});
		countryDataArr = countryDataArr.splice(1, 21);

		let stateDataString = '*State  |  Confirmed  |  Deaths*';

		stateDataString = `${stateDataString}\n*_World_ | ${worldTotalConf.toLocaleString()} | ${worldTotalDeaths.toLocaleString()}*`;
		for (const inGlobe of countryDataArr) {
			stateDataString = `${stateDataString}\n_${inGlobe.State.replace(
				'\n',
				''
			).trim()}_ | *${inGlobe.Confirmed.toLocaleString()}* | ${inGlobe.Deaths.toLocaleString()}`;
		}
		stateDataString = `${stateDataString}\n\n_${coronaSlogan}_`;
		const message = {
			responseUrl: slackReqObj.response_url,
			replaceOriginal: false,
			text: greet + '\n\n' + stateDataString + '\nSource: WHO',
			mrkdwn: true,
			mrkdwn_in: ['text'],
		};
		await delay(250);
		return postChatMessage(message).catch((ex) => {
			log.error(ex);
		});
	} catch (error) {
		console.error(error);
	}
};
