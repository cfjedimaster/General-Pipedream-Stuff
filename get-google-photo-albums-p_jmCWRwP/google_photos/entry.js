import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    google_photos: {
      type: "app",
      app: "google_photos",
    }
  },
  async run({steps, $}) {

    let result = await axios($, {
  		url: 'https://photoslibrary.googleapis.com/v1/albums?pageSize=50',
  		headers: {
  			Authorization: `Bearer ${this.google_photos.$auth.oauth_access_token}`,
  		},
  	});
    console.log(result);
    
    /*
  	let favorite = result.albums.find(a => {
  		return a.title === 'Favorites';
  	});
    
    return await axios($, {
      url: `https://www.googleapis.com/oauth2/v1/userinfo`,
      headers: {
        Authorization: `Bearer ${this.google_photos.$auth.oauth_access_token}`,
      },
    })
    */
  },
})
