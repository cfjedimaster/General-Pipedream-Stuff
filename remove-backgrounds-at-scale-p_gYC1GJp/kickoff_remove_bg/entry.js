
export default defineComponent({
  async run({ steps, $ }) {

  	let data = {
  		"input": {
  			"href": steps.trigger.event.link,
  			"storage": "dropbox"
    		},
  		"output": {
  		    "href": steps.get_dropbox_upload_url.$return_value.link,
  		    "storage": "dropbox",
      		"overwrite": true
  		}
  	};
  console.log(data);
  	let resp = await fetch('https://image.adobe.io/sensei/cutout', {
  		method: 'POST', 
  		headers: {
  			'Authorization':`Bearer ${steps.get_access_token.$return_value}`,
  			'x-api-key': process.env.FFS_CLIENT_ID
  		}, 
  		body: JSON.stringify(data)
  	});
  
  	return await resp.json();  
  
  },
})