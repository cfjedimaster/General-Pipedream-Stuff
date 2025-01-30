import Atproto  from '@atproto/api';
const { BskyAgent } = Atproto;
import fs from 'fs';
import sharp from 'sharp';

export default defineComponent({
  async run({ steps, $ }) {

    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

   await agent.login({
      identifier: 'dragonhoards.bsky.social',
      password: process.env.DRAGONHOARDS_BLUESKY
    });

    // handle no image result
    let embed;
    
    if(steps.generateImage.$return_value) {

      const file = fs.readFileSync(steps.generateImage.$return_value);
      const image = Buffer.from(file);
      let encoding = 'image/jpeg';

      let newImage = await sharp(image).resize({width:600}).toBuffer();
      console.log('made a new thing');

      const { data } = await agent.uploadBlob(newImage, { encoding } )

      // not sure if this will work...
      if(file.indexOf('.png')) encoding = 'image/png';

      embed = {
        $type:'app.bsky.embed.images', 
        images:[{
          alt:'AI generated image.', 
          image: data.blob
        }]
      }
    }

    let post = {
      text: steps.generateStory.$return_value,
      createdAt: new Date().toISOString()
    };

    if(embed) post.embed = embed;
    
    await agent.post(post);

    return true;
  },
})