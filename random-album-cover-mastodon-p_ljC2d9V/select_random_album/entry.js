// To use any npm package, just import it
// import axios from "axios"

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default defineComponent({
  async run({ steps, $ }) {
    // Reference previous step data using the steps object and return data to use it in future steps
    return steps.spotify_get_random_album.$return_value.albums.items[getRandomInt(0,steps.spotify_get_random_album.$return_value.albums.items.length )]
  },
})