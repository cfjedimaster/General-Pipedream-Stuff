// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    let html = `
<h2>Guestbook Entry Submission</h2>

<p>
The following information was submitted:
</p>
<p>
Name: <b>${steps.trigger.event.body.name}</b>
</p>
<p>
Comments:<br/>
<b>${steps.trigger.event.body.comment}</b>
</p>

<p>
<a href="${process.env.APPROVE_GB}/?range=${encodeURIComponent(steps.add_single_row.$return_value.updatedRange)}">Click to Approve</a>
</p>

    `;

    return html;
  },
})