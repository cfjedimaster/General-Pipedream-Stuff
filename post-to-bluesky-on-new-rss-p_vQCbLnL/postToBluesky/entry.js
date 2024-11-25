import Atproto  from '@atproto/api';
const { RichText, BskyAgent } = Atproto;
import * as cheerio from 'cheerio';

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
    	text: steps.generateText.$return_value.text,
    });
    await rt.detectFacets(agent);

   let card = {
      uri:steps.trigger.event.link,
      title:steps.trigger.event.title,
    }

    let req = await fetch(steps.trigger.event.link);
    let html = await req.text();
    let $$ = cheerio.load(html);

    card.description = $$('meta[property="og:description"]').attr('content');
    let image = $$('meta[property="og:image"]').attr('content');

    let blob = await fetch(image).then(r => r.blob());
    let { data } = await agent.uploadBlob(blob, { encoding:'image/jpeg'} );

    card.thumb = data.blob;

    await agent.post({
      text: rt.text,
      facets: rt.facets,
      createdAt: new Date().toISOString(),
      langs:['en-US'],
      embed: {
        $type: "app.bsky.embed.external",
        external:card
      }
    })

    return steps.trigger.event
  },
})
