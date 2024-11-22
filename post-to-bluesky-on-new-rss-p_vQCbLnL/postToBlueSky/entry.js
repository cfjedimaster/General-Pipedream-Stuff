import Atproto  from '@atproto/api';
import * as cheerio from 'cheerio';
const { RichText, BskyAgent } = Atproto;

export default defineComponent({
  async run({ steps, $ }) {

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });
    
    await agent.login({
     identifier: 'raymondcamden.com',
     password: process.env.BLUESKY_RAYMONDCAMDEN_PASSWORD
    });

  const rt = new RichText({
  	text: steps.generateText.$return_value.text
  });
    
  await rt.detectFacets(agent);

  let card = {
  	uri:steps.trigger.event.link,
  	title:steps.trigger.event.title,
  }

  let req = await fetch(steps.trigger.event.link);
  let html = await req.text();
  let $$ = cheerio.load(html);
  card.description = $$('meta[name="og:description"]').attr('content');

  let image = $$('meta[name="og:image"]').attr('content');
  let blob = await fetch(image).then(r => r.blob());
  let { data } = await agent.uploadBlob(blob, { encoding:'image/jpeg'} );

  card.thumb = data.blob; 
    
  await agent.post({
    text: rt.text,
    facets: rt.facets,
    langs:['en-US'],
    createdAt: new Date().toISOString(),
    embed: {
        $type: "app.bsky.embed.external",
        external:card
      }   
  })
    
    // Reference previous step data using the steps object and return data to use it in future steps
    return steps.trigger.event
  },
})