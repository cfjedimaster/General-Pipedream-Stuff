import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    youtube_analytics_api: {
      type: "app",
      app: "youtube_analytics_api",
    },
    playlistId: {
      type:"string",
      label:"Playlist ID",
      optional:false
    }
  },
  async run({steps, $}) {

    return await axios($, {
      url: `https://youtubeanalytics.googleapis.com/v2/reports?endDate=2024-06-30&filters=playlist%3D%3D${this.playlistId}&ids=channel%3D%3DMINE&metrics=views%2CestimatedMinutesWatched%2CplaylistStarts%2CplaylistViews%2CviewsPerPlaylistStart&startDate=2023-01-01`,
      headers: {
        Authorization: `Bearer ${this.youtube_analytics_api.$auth.oauth_access_token}`,
      },
    })
  },
})
