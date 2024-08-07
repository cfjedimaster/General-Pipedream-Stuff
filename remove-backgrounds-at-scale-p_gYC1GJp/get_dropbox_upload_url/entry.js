import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    dropbox: {
      type: "app",
      app: "dropbox",
    }
  },
  async run({steps, $}) {
    
    const data = {
      "commit_info":{
        "path": steps.generate_output_path.$return_value
      }
    };
    
    return await axios($, {
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_temporary_upload_link`,
      headers: {
        Authorization: `Bearer ${this.dropbox.$auth.oauth_access_token}`,
        "Content-Type": `application/json`,
      },
      data,
    })
  },
})
