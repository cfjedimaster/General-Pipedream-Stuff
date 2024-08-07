// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    if(steps.trigger.event.path_lower.includes('/output')) {
      $.flow.exit('Not doing output processing.');
    }
    // Reference previous step data using the steps object and return data to use it in future steps
    return;
  },
})