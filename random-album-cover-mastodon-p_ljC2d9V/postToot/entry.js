import Mastodon from 'mastodon-api'
import fs from 'fs'

export default defineComponent({
  async run({ steps, $ }) {

    const M = new Mastodon({
      access_token: process.env.RANDOMALBUMCOVER_MASTODON,
      api_url: 'https://botsin.space/api/v1/', 
    });

    let artists = steps.select_random_album.$return_value.artists.reduce((cur, art) => {
      if(cur == '') return art.name;
      return cur + ', ' + art.name
    },'');

    let toot = `
Album:     ${steps.select_random_album.$return_value.name} (${steps.select_random_album.$return_value.external_urls.spotify})
Artist(s): ${artists}
Released:  ${steps.select_random_album.$return_value.release_date}
  `.trim()

    let resp = await M.post('media', { file: fs.createReadStream('/tmp/cover.jpg') });
    await M.post('statuses', { 
        status: toot,
        media_ids: [resp.data.id] 
    });

  },
})