import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    google_photos: {
      type: "app",
      app: "google_photos",
    }, 
    album: {
      type:"string"
    },
    cache: {
      type:"data_store"
    }
  },
  async run({steps, $}) {


    let cacheDuration = 1 * 60 * 60 * 1000;
    let now = Date.now();
    let cachedDataTime = await this.cache.get('photocachetime');
    let cachedData = await this.cache.get('photocache');

    if(cachedDataTime && (now - cachedDataTime < cacheDuration) && cachedData) return cachedData;
    console.log('not cached'); 

    let result = await axios($, {
      url: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
      headers: {
        Authorization: `Bearer ${this.google_photos.$auth.oauth_access_token}`,
      },
      method:'post',
      data: {
        albumId:this.album,
        pageSize:100
      }
    });

    let photos = result.mediaItems.map(m => m.baseUrl);
    await this.cache.set('photocache', photos);
    await this.cache.set('photocachetime', now);
    
    return photos;

  },
})
