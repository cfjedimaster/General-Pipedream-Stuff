export default defineComponent({
  async run({ steps, $ }) {

    return steps.get_values_in_range.$return_value.filter(a => a[2] === 'TRUE').map(a => {
      return {
        name: a[0], 
        comment: a[1]
      }
    });

  },
})