import express from 'express';
import { log, wishMe, reportsList } from './utils';
import { processEventMiddle } from './middleware/eventProcessor';
const router = new express.Router();

router.post('/slack/command/hi', async (req, res) => {
	try {
		const slackReqObj = req.body;
		const wishText = await wishMe();
		const response = {
			response_type: 'in_channel',
			channel: slackReqObj.channel_id,
			text: 'Hey ' + slackReqObj.user_name + ', ' + wishText + ' :slightly_smiling_face: ',
			attachments: [
				{
					text: 'What would you like to get?',
					fallback: 'What would you like to get?',
					color: '#2c963f',
					attachment_type: 'default',
					callback_id: 'event_call_id',
					actions: [
						{
							name: 'reports_select_menu',
							text: 'Choose an interest...',
							type: 'select',
							options: reportsList,
						},
					],
				},
			],
		};

		return res.json(response);
	} catch (err) {
		log.error(err);
		return res.status(500).send("Something blew up. We're looking into it.");
	}
});

router.post('/slack/actions', async (req, res) => {
	try {
		const slackReqObj = JSON.parse(req.body.payload);
		console.log(slackReqObj);
		let response;
		if (slackReqObj.callback_id === 'event_call_id') {
			response = await processEventMiddle({ slackReqObj });
		}
		return res.json(response);
	} catch (err) {
		log.error(err);
		return res.status(500).send("Something blew up. We're looking into it.");
	}
});
export default router;
