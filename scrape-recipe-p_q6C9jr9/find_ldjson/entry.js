import cheerio from "cheerio";

// https://stackoverflow.com/a/67898554/52160
async function findLDJSON(u) {
  let req = await fetch(u);
  let html = await req.text();
  let $ = cheerio.load(html);
  let jdjson = $("script[type='application/ld+json']");
  if(jdjson.length === 0) return;
  let content = JSON.parse(jdjson[0].children[0].data);
  /*
  I've seen this be an array, and just a json string with a top level @graph that seems to
  map the array I see elsewhere. So if array, return [0], else look for @graph. graph will
  be an array with one type per, so we'll try to find recipe and return it, which makes the
  check in findRecipe a bit redundant.
  */
  if(Array.isArray(content)) return content[0];
  else {
    if(content['@graph'] && Array.isArray(content['@graph'])) {
      for(let t of content['@graph']) {
          if(t['@type'] === 'Recipe') return t;        
      }
    }
  }
  return;
}

export default defineComponent({
  async run({ steps, $ }) {
    let ldjson = await findLDJSON(steps.trigger.event.query.url);
    console.log('ldjson', ldjson)
    if(!ldjson) {
      await $.respond({
        status:200, 
        headers: {
          'Content-Type':'application/json'
        }, 
        body: JSON.stringify({success:false, message:'LD+JSON not found.'})
      });
      return $.flow.exit("No LD+JSON found");
    }
    return ldjson;
  },
})