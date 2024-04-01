import Atproto  from '@atproto/api';
const { BskyAgent } = Atproto;

export default defineComponent({
  async run({ steps, $ }) {

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

   await agent.login({
      identifier: 'dragonhoards.bsky.social',
      password: process.env.DRAGONHOARDS_BLUESKY
    });

    await agent.post({
      text: steps.generateStory.$return_value,
      createdAt: new Date().toISOString()
    });

    return true;
  },
})