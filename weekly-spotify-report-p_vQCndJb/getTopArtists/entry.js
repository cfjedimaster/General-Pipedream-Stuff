/*
Call the Spotify API to get items, and every time we have more, call it again.
Recursion - what could possibly go wrong!
*/
const getItems = async function($, token, url, items=[]) {
  console.log('url', url);
  let result = await axios($, {
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  console.log(result.total);
  items.push(...result.items);

  if(result.next) {
    return await getItems($, token, result.next, items);
  } else return items;
}

import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    spotify: {
      type: "app",
      app: "spotify",
    }
  },
  async run({steps, $}) {

    return await getItems($, this.spotify.$auth.oauth_access_token, 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50');
  },
})
