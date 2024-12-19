// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  props: {
    data: { type: "data_store" },
  },
  async run({ steps, $ }) {
    let ts = Math.floor(new Date().getTime()/1000);
    await this.data.set("lastRun", ts);
    return ts;
  },
})