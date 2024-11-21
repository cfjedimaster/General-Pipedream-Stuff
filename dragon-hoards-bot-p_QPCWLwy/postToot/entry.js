import Mastodon from 'mastodon-api'

export default defineComponent({
  async run({ steps, $ }) {

   const M = new Mastodon({
      access_token: process.env.DRAGONHOARDS_MASTODON,
      api_url: 'https://mastodon.social/api/v1/', 
    });


    await M.post('statuses', { 
        status: steps.generateStory.$return_value,
    });

    return true;
  },
})