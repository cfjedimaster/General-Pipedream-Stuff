/*
I figure out the Unix timestamp for 7 days ago
*/
export default defineComponent({
  async run({ steps, $ }) {

    // Credit: https://stackoverflow.com/a/54844661/52160
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ;

    return sevenDaysAgo.getTime();
  },
})