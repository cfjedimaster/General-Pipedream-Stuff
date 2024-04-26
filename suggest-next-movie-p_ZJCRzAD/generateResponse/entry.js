import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

async function callGemini(text,model) {

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
		response_mime_type:'application/json'
	};

	const safetySettings = [
		{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
		{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,	threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
		{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
		{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
	];

	const parts = [
    	{text},
  	];

	const result = await model.generateContent({
		contents: [{ role: "user", parts }],
		generationConfig,
		safetySettings,
	});


	try {

		if(result.response.promptFeedback && result.response.promptFeedback.blockReason) {

			return { error: `Blocked for ${result.response.promptFeedback.blockReason}` };
		}
		const response = result.response;
		return JSON.parse(response.candidates[0].content.parts[0].text);
	} catch(e) {

		return {
			error:e.message
		}
	}
	
}

export default defineComponent({
  async run({ steps, $ }) {
    
    const MODEL_NAME = "gemini-1.5-pro-latest";
    const API_KEY = process.env.GOOGLE_API_KEY;

    const si = `
You are an expert at movies and can make recommendations for a movie a person should watch based on their last film. 

Your response should be a JSON object containing an array of recommendations in this form:

* title: The title of the movie.
* year: The year it was released.
* reason: A one sentence explanation for why the film was recommended.
    `;
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME,
    	systemInstruction: {
    		parts: [{ text:si }],
    		role:"model"
    	} } , { apiVersion:'v1beta' });

    return await callGemini(steps.generatePrompt.$return_value,model);
    
  },
})