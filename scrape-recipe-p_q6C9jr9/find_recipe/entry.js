import tinyduration from "tinyduration";

function findRecipe(jdjson) {
  // @type is an array - not sure if ALWAYS an array
  if(jdjson['@type'].indexOf('Recipe') === -1) return;
  let result = {};
  result.name = jdjson['name'];
  result.image = jdjson['image'];
  result.description = jdjson['description'];
  result.cookTime = durationToStr(jdjson['cookTime']);
  result.prepTime = durationToStr(jdjson['prepTime']);
  result.totalTime = durationToStr(jdjson['totalTime']);
  result.category = jdjson['recipeCategory'] ?? '';
  result.cuisine = jdjson['recipeCuisine'] ?? '';
  result.ingredients = jdjson['recipeIngredient'];
  // todo, parse out to just text? see if types are more complex
  result.instructions = parseInstructions(jdjson['recipeInstructions']);
  result.yield = jdjson['recipeYield'][0];
  
  return result;
}

function parseInstructions(instructions) {
  let result = [];
  for(let instruction of instructions) {
    if(typeof instruction === 'string') result.push(instruction);
    else {
      if(instruction['@type'] === 'HowToStep') result.push(instruction.text);
    }
  }
  return result;
}

/*
I convert an iso-8601 to a duration ob and then into a string.
I assume no value greater than hours
*/
function durationToStr(d) {
  if(!d) return '';
  let parsed = tinyduration.parse(d);
  let result = [];
  if(parsed.hours) {
      result.push(`${parsed.hours} hours`);
  }
  if(parsed.minutes) {
      result.push(`${parsed.minutes} minutes`);
  }
  if(parsed.seconds) {
      result.push(`${parsed.seconds} seconds`);
  }
  
  let formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  return formatter.format(result);
  
}

export default defineComponent({
  async run({ steps, $ }) {

    let recipe = findRecipe(steps.find_ldjson.$return_value);
    if(!recipe) {
      await $.respond({
        status:200, 
        headers: {
          'Content-Type':'application/json'
        }, 
        body: JSON.stringify({success:false, message:'Recipe not found.'})
      });
      return $.flow.exit("No recipe found");
    } else {

      await $.respond({
        status:200, 
        headers: {
          'Content-Type':'application/json'
        }, 
        body: JSON.stringify({success:true, recipe })
      });

    }
  
  },
})