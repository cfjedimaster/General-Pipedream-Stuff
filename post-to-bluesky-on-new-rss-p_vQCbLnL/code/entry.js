// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {

      return {
      text: `
New post from my blog: "${steps["trigger"]["event"]["title"]}"

${steps["trigger"]["event"]["link"]}
      `
    }

  },
})