import axios from 'axios';
import { SPOTIFY_GLOBAL_VIRAL, SPOTIFY_IN_VIRAL } from '../constants';
import { postChatMessage } from '../fileUploader';
import { delay } from '../utils';

export const topTenList = async (options = {}, { slackReqObj }) => {
  let trackString = '';
  const responseData = await axios.get(SPOTIFY_IN_VIRAL);
  let viralTrackArr = responseData.data.split('\n');
  viralTrackArr = viralTrackArr.splice(1, 10);

  for (const key in viralTrackArr) {
    if (viralTrackArr.hasOwnProperty(key)) {
      let viralTrackSplit = viralTrackArr[key].split(',');
      //trackString = trackString + '\n' + viralTrackArr[key];
      trackString = `*Track No. ${viralTrackSplit[0]}* ➢ ${viralTrackSplit[1]} ( ${viralTrackSplit[2]} )\n🎧 _${viralTrackSplit[3]} _ \n${trackString}`;
    }
  }
  //console.log(trackString);
  await delay(250);
  const message = {
    responseUrl: slackReqObj.response_url,
    replaceOriginal: false,
    text: `*Top 10 spotify tracks:* \n\n${trackString}\n`,
    mrkdwn: true,
    mrkdwn_in: ['text']
  };
  return postChatMessage(message).catch(ex => {
    log.error(ex);
  });
};
