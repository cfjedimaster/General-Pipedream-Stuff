export default defineComponent({
  async run({ steps, $ }) {
    let lastMovie = steps.get_films.$return_value[0];
    let title = lastMovie['letterboxd:filmtitle']['#'];
    
    $.export('title', title);
    
    return `
The last movie I watched is "${title}". What would you suggest I watch next?
    `;
  },
})