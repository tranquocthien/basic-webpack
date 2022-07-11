require('./css/app.css');
require('./index.html');

import { dinos, compareWeight, compareHeight, compareDiet } from './dino.js';
import { Human } from './human.js';
import {
  shapeData,
  replaceFacts,
  generateRandomIndexes,
  showComparison
} from './helpers.js';

// Since I'm using webpack, I want to import the images so they will be part of the output (images in public dir)
/* eslint-disable no-unused-vars */
import anklyosaurus from './images/anklyosaurus.png';
import brachiosaurus from './images/brachiosaurus.png';
import elasmosaurus from './images/elasmosaurus.png';
import human from './images/human.png';
import pigeon from './images/pigeon.png';
import pteranodon from './images/pteranodon.png';
import stegosaurus from './images/stegosaurus.png';
import triceratops from './images/triceratops.png';
import tyrannosaurusrex from './images/tyrannosaurus rex.png';
/* eslint-enable no-unused-vars */

// Remove form from screen and Add tiles to DOM
const btnCompare = document.querySelector('.compare');

btnCompare.addEventListener('click', () => {

  // Use IIFE to get human data from form at init time
  const humanDataObj = (function() {
    return {
      name: document.querySelector('#name').value,
      height: {
        feet: document.querySelector('#feet').value,
        inches: document.querySelector('#inches').value
      },
      weight: document.querySelector('#weight').value,
      diet: document.querySelector('#diet').value
    };
  })();

  let humanOb = new Human(humanDataObj);

  let transformedDinosArr = shapeData(dinos, humanOb);
  let arrBeforeFactMutation = [...transformedDinosArr];

  generateRandomIndexes(transformedDinosArr, 3);

  const indexesToReplaceWithFacts = generateRandomIndexes(
    transformedDinosArr,
    3
  );

  let weightComparison = compareWeight(
    transformedDinosArr[indexesToReplaceWithFacts[0]].weight,
    humanOb.weight,
    humanOb.name
  );

  let heightComparison = compareHeight(
    transformedDinosArr[indexesToReplaceWithFacts[1]].height,
    humanOb.height,
    humanOb.name
  );

  let dietComparison = compareDiet(
    transformedDinosArr[indexesToReplaceWithFacts[2]].diet,
    humanOb.diet,
    humanOb.name
  );

  let newArrWithFacts = replaceFacts(
    transformedDinosArr,
    indexesToReplaceWithFacts,
    [weightComparison, heightComparison, dietComparison]
  );

  showComparison(
    arrBeforeFactMutation,
    newArrWithFacts,
    'dino-compare',
    'grid',
    {
      element: 'div',
      text: 'Back!',
      classes: ['btn', 'goBack']
    }
  );
});
