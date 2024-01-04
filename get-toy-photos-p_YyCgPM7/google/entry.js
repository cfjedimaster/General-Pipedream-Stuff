import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    google: {
      type: "app",
      app: "google",
    }
  },
  async run({steps, $}) {

    let result = await axios($, {
      url: `https://photoslibrary.googleapis.com/v1/albums`,
      headers: {
        Authorization: `Bearer ${this.google.$auth.oauth_access_token}`,
      },
    });
    console.log(result);
  },
})
