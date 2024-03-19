// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    // Reference previous step data using the steps object and return data to use it in future steps
    let result = {
      views: steps.youtube_analytics_api.$return_value.rows[0][0],
      estimatedMinutesWatched: steps.youtube_analytics_api.$return_value.rows[0][1],
      playlistStarts:steps.youtube_analytics_api.$return_value.rows[0][2],
      playlistViews:steps.youtube_analytics_api.$return_value.rows[0][3], 
      viewsPerPlaylistStart:steps.youtube_analytics_api.$return_value.rows[0][4]
    };
    console.log(result);

    await $.respond({
      status: 200,
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify(result),
    })
  },
})