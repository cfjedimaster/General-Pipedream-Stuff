// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {

    if(steps.filterToNew.$return_value.length === 0 ) $.flow.exit('No incidents');

  },
})