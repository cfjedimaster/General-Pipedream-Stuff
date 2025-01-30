import Mastodon from 'mastodon-api';
import fs from 'fs';

export default defineComponent({
  async run({ steps, $ }) {

   const M = new Mastodon({
      access_token: process.env.DRAGONHOARDS_MASTODON,
      api_url: 'https://mastodon.social/api/v1/', 
    });

    let media_ids = [];

    // handle no image result
    if(steps.generateImage.$return_value) {
      let resp = await M.post('media', { file: fs.createReadStream(steps.generateImage.$return_value) });
      media_ids.push(resp.data.id)
    }
    
    await M.post('statuses', { 
        status: steps.generateStory.$return_value,
        media_ids
    });

    return true;
  },
})