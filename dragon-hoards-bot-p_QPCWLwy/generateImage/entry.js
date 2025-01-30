import fs from 'fs';

export default defineComponent({
  async run({ steps, $ }) {

      let API_KEY = process.env.GOOGLE_API_KEY;
    
      let body = {
      	instances: [
      		{ prompt: steps.generateStory.$return_value },
      	],
      	parameters: {
      		aspectRatio:'1:1',
          sampleCount: 1
      	}
      };

      let model_name = 'imagen-3.0-generate-002';
      let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model_name}:predict?key=${API_KEY}`, {
        method: 'POST',
        headers: {
      	'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
          
      let result = await resp.json();
      if(result.error) {
        console.log(result);
        return '';
      }
    
      let file = '/tmp/temp.png';
      if(result.predictions.length) {
        if(result.predictions[0].mimeType == 'image/jpeg') {
          file = '/tmp/temp.jpg';
        }
        
        let buffer = Buffer.from(result.predictions[0].bytesBase64Encoded, 'base64');
        fs.writeFileSync(file, buffer);            
      }

      return file;
  },
})