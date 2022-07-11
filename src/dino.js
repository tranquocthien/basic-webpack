import { Dinos } from '../data/dino.json';

// Create Dino Constructor
// I decided to use a functional mixin
function Dino(obj) {
  return Object.assign({}, obj, {
    timestamp: Date.now()
  });
}

export let dinos = Dinos

// Create 9 Dino Objects
// These are going to be part of the Window object
Dinos.map(element => {
  global[element.species] = new Dino(element);
});

// We check if user provided a name and return the name or the Human string
function humanOrName(val) {
  if(val) return val
  else return 'the Human'
}

// We can reuse logic to avoid code duplication between weight and height comparison
function dryComparison(dinoField, humanField, humanName, comparing) {
  let dino = parseInt(dinoField)
  let human = parseInt(humanField)
  const name = humanOrName(humanName)

  // Since we are not validating, we will default "NO values" to 0
  dino = dino ? dino : 0
  human = human ? human : 0

  if (dino > human) {
    return `This dino is ${dino - human} ${comparing.unit} ${comparing.up} than ${name}`;
  } else {
    if (dino > comparing.unit) return 'We have a Super Human!';
    else return `This dino is ${human - dino} ${comparing.unit} ${comparing.down} than ${name}`;
  }
}

// Create Dino Compare Method 1 - Comparing Weight
// NOTE: Weight in JSON file is in lbs, height in inches.
// Boilerplate says height is in inches but it is wrong, it is in feet
export function compareWeight(dinoWeight, humanWeight, humanName) {
  // Heaviest person was 1,400lbs >> Jon Brower Minnoch
  return dryComparison(dinoWeight, humanWeight, humanName, { up: 'weighter', down: 'lighter', unit: 'lbs', maxValueForHuman: 1400 })
}

// Create Dino Compare Method 2 - Comparing Height
export function compareHeight(dinoHeight, humanHeightObj, humanName) {
  // Tallest person was 8 ft 11.1 in >> Robert Wadlow
  const convertedHeight = parseInt(humanHeightObj.feet) + (parseInt(humanHeightObj.inches) / 12)
  return dryComparison(dinoHeight, convertedHeight, humanName, { up: 'taller', down: 'smaller', unit: 'feet', maxValueForHuman: 9  })
}

// Create Dino Compare Method 3 - Comparing Diet
export function compareDiet(dinoDiet, humanDiet, humanName) {
  const dino = dinoDiet.trim().toLowerCase()
  const human = humanDiet.trim().toLowerCase()
  if ( dino === human ) {
    return `Woohoo! Both are ${dino}`
  } else {
    return `This dino is ${dino} and ${humanOrName(humanName)} is ${human}`
  }
}
