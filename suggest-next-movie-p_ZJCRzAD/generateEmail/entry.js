export default defineComponent({
  async run({ steps, $ }) {
    let html = `
<h2>Movie Recommendations</h2>

<p>
The last movie you watched was "${steps.generatePrompt.title}". I asked Google Gemini what you should watch next
and this is what it recommended:
</p>
    `;

    for(let film of steps.generateResponse.$return_value.recommendations) {
      html += `
 <h3>${film.title} (${film.year})</h3>

 ${film.reason}
      `;
    }

    return html;
  },
})