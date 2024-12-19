// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  props: {
    data: { type: "data_store" },
  },
  async run({ steps, $ }) {
    let lastRun = (await this.data.get('lastRun')) ?? 0;
    console.log('lastRun is', 0);
    return steps.getIncidents.$return_value.filter(x => {
      return x.parsed_time > lastRun;
    })

  },
})