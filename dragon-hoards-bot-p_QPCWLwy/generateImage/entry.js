import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

export default defineComponent({
  async run({ steps, $ }) {

      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp-image-generation",
        generationConfig: {
            responseModalities: ['Text', 'Image']
        },
      });

      let contents = `
      Generate an image of the following and do not include any text: 
      
      ${steps.generateStory.$return_value}
      `;

      try {
        const response = await model.generateContent(contents);
      
        let file = '/tmp/temp.png';
        
        for (const part of  response.response.candidates[0].content.parts) {
          if (part.inlineData) {
            // in theory this may run N times, but its ok
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, 'base64');
            fs.writeFileSync(file, buffer);
          }
        }
      
        return file;
      } catch(e) {
        console.log('failed to generate', e);
        return '';
      }
      
  },
})