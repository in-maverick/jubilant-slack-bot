import { functionSelector } from './functionSelector';

export const processEventMiddle = async (options) => {
	const { slackReqObj } = options;

	const reportKey = slackReqObj.actions[0].selected_options[0].value;
	console.log('reportKey', reportKey);

	const appropriateFun = await functionSelector(reportKey);
	appropriateFun({}, { slackReqObj });
	const response = {
		response_type: 'in_channel',
		text: 'Great! Please wait while I am processing your interest...',
		mrkdwn: true,
		mrkdwn_in: ['text'],
	};
	return response;
};
