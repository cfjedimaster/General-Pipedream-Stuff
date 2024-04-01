import randomWordSlugs from "random-word-slugs";
import indefinite from "indefinite";
import pluralize from "pluralize";

const getRandomIntInclusive = function(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); 
}

const locations = [
  "in an ancient temple", "in a jungle", "by a dusty fountain", "on the shore of an ocean", 
  "on a distant planet", "inside a whirlpool", "on an ancient moon", "on an island", 
  "by a lake", "by a forest lake", "under your bed", "in a unicorn's forest", "far from people", 
  "under a lake", "in a castle in the sky", "on a forgotten mountain", "at the bottom of a whirlpool", 
  "in a nebula", "far away under rocks and stone", "in a mossy grove", "in a sock drawer", 
  "inside an abandoned castle", "at the end of a rainbow", "on a mountain top", "in a moonlit forest", 
  "inside a black hole", "in the ruins of a city", "on a deserted island", "in a jungle", 
  "in a forest temple", "in a long forgotten city", "on a moon", "on a distant planet", 
  "deep inside a well", "in an old mansion", "on a crumbling mountain", "on a forgotten island", 
  "in a haunted house", "on the other side of a rainbow", "on a lonely island", 
  "under a child's bed", "in a castle in the clouds", "in the ruins of a village", 
  "deep in a cave", "under a haunted house", "near a village"  
];

const verbs = [
  "sees", "explores", "sorts", "inventories", "loves", "estimates", "guards", 
  "tallies", "reminisces over", "regards", "proud of", "looks over","searches", "investigates",
  "is proud of", "examines", "fiddles with", "counts","admires","loves","admires",
];

const getDragonType = function() {
  const options = {
    format:'lower',
    partsOfSpeech: ['adjective'],
    categories: {
      adjective: ['color','appearance','personality']
    }
  }
  
  return randomWordSlugs.generateSlug(1, options);
}

const getLocation = function() {
  return locations[getRandomIntInclusive(0, locations.length-1)]
}

const getVerb = function() {
  return verbs[getRandomIntInclusive(0, verbs.length-1)]
}

const getHoard = function() {
  const options = {
    format:'lower',
    partsOfSpeech: ['adjective'],
    categories: {
      adjective: ['quantity']
    }
  }

  let quantity = randomWordSlugs.generateSlug(1, options);

  const options2 = {
    format:'lower',
    partsOfSpeech: ['noun'],
    categories: {
      noun: ['animals','food','thing']
    }
  }

  let item = pluralize(randomWordSlugs.generateSlug(1, options2));
  let ofWords = ['hundreds','thousands','millions','billions'];
  let joiner = ' ';
  /*
  hard coded logic - may revisit
  */
  if(ofWords.indexOf(quantity) >= 0) joiner = ' of ';
  
  return `${quantity}${joiner}${item}`;
  
}

const getFeeling = function() {
  const options = {
    format:'lower',
    partsOfSpeech: ['adjective'],
    categories: {
      adjective: ['condition']
    }
  }
      
  return randomWordSlugs.generateSlug(1, options);  
}

export default defineComponent({
  async run({ steps, $ }) {

    let type = getDragonType();
    let hoards = [];
    for(let i=0;i<3;i++) {
       hoards.push(getHoard())
    }
    
    let hoardStr = `${hoards[0]}, ${hoards[1]}, and ${hoards[2]}`;
    
  	return `${indefinite(type, {capitalize:true})} dragon lives ${getLocation()}. She ${getVerb()} her hoard, which consists of ${hoardStr}. She feels ${getFeeling()}.`;
	
  },
})