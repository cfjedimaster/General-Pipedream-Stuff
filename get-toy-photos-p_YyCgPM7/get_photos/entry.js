import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    google_photos: {
      type: "app",
      app: "google_photos",
    }
  },
  async run({steps, $}) {

    const ALBUM = 'AMfAEpztLpk-HzVAka8zgRTM32Q2dL4LvDAJhp-lgloXaT27jEWFnFvpDbgOOfFYxoVmFwKr4E34';

    let result = await axios($, {
      url: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
      headers: {
        Authorization: `Bearer ${this.google_photos.$auth.oauth_access_token}`,
      },
      method:'post',
      data: {
        albumId:ALBUM,
        pageSize:100
      }
    });

    let photos = result.mediaItems.map(m => m.baseUrl);
    // todo: add caching
    return photos;

  },
})
