
export default defineComponent({
  async run({ steps, $ }) {

    await $.respond({
      status: 200,
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify(steps.filter_and_map.$return_value),
    })
  },
})
