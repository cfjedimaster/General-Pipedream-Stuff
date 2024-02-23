import Mastodon from 'mastodon-api'
import fs from 'fs'

export default defineComponent({
  async run({ steps, $ }) {

      const M = new Mastodon({
        access_token: process.env.CAT_BOT_MASTODON,
        api_url: 'https://botsin.space/api/v1/', 
      });

      let resp = await M.post('media', { file: fs.createReadStream('/tmp/cat.jpg') });

      await M.post('statuses', { 
          status: steps.selectMessage.$return_value[0],
          media_ids: [resp.data.id] 
      });

  },
})