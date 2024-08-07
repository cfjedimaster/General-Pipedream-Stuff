// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.FFS_CLIENT_ID);
    params.append('client_secret', process.env.FFS_CLIENT_SECRET);
    params.append('scope', 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis');
    
    let resp = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', 
      { 
        method: 'POST', 
        body: params
      }
    );
    
    let data = await resp.json();
    return data.access_token; 
  
  },
})