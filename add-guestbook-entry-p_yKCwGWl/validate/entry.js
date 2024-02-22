// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {

    if(!steps.trigger.event.body || !steps.trigger.event.body.comment || !steps.trigger.event.body.name) return $.flow.exit('No name or comment.')
    // Reference previous step data using the steps object and return data to use it in future steps
    return steps.trigger.event
  },
})