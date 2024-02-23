export default defineComponent({
  async run({ steps, $ }) {

    let url = `https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_API}&size=med`;

    let result = await fetch(url);
    let data = await result.json();
    if(!data || !data.length) return $.flow.exit("no data");
    return data[0].url;

  },
})