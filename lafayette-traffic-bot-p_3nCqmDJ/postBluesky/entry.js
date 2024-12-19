import Atproto  from '@atproto/api';
const { BskyAgent } = Atproto;

export default defineComponent({
  async run({ steps, $ }) {

   const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

   await agent.login({
      identifier: 'lafayettetraffic.bsky.social',
      password: process.env.BLUESKY_LAFAYETTETRAFFIC_PASSWORD
    });

    // post for each, hopefully not too much...
    for(let incident of steps.filterToNew.$return_value) {
      let report = `
 Location: ${incident.location}
 Reason: ${incident.reason}

 Date/Time: ${incident.time}
      `
    await agent.post({
      text: report,
      createdAt: new Date().toISOString()
    });

    }  
  
  },
})