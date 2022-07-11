// Helpers

// For data
// We generate a new array including human and setting its proper index on the array
export function shapeData(originalDinoArr, humanOb) {
  // Create new array including human
  const arrMiddle = Math.floor(originalDinoArr.length / 2);
  let arrWithHuman = [
    ...originalDinoArr.slice(0, arrMiddle),
    humanOb,
    ...originalDinoArr.slice(arrMiddle)
  ];

  // We replace bird fact with rubric string
  // We map to avoid referring to the last element of the array in case the data shape changes
  arrWithHuman.map(el => {
    if (el.species.trim().toLowerCase() === 'pigeon')
      el.fact = 'All birds are Dinosaurs';
  });

  return arrWithHuman;
}

export function replaceFacts(originalArr, indexesToReplaceArr, newFacts) {
  const newArrWithModifiedFacts = originalArr.map(obj =>
    Object.assign({}, obj)
  );
  for (let i = 0; i < indexesToReplaceArr.length; i++) {
    newArrWithModifiedFacts[indexesToReplaceArr[i]].fact = `${newFacts[i]}`;
  }
  return newArrWithModifiedFacts;
}

export function restoreFacts(originalArr) {
  return originalArr;
}

// We are going to use this map to target human and bid indexes which we will use to exclude in random
function getHumanAndBirdIndexes(arr) {
  let humanIndex, birdIndex;

  arr.map((el, index) => {
    if (el.species.trim().toLowerCase() === 'pigeon') birdIndex = index;
    if (el.species.trim().toLowerCase() === 'human') humanIndex = index;
  });
  return {
    bird: birdIndex,
    human: humanIndex
  };
}

// Random
function randomNumberWithRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomIndexes(arr, gridLength) {
  // Random comparison
  let indexesToExclude = getHumanAndBirdIndexes(arr);
  indexesToExclude = Object.values(indexesToExclude);

  // Calculate "rows"
  let gridRows = Math.ceil(7 / gridLength);
  let lastRowElements = 7 % gridLength;

  // I want to ensure I have one random fact per row
  let validIndexes = [];
  for (let i = 1; i <= gridRows; i++) {
    let start = (i - 1) * gridLength;
    let end =
      i === gridRows ? start + lastRowElements : start + (gridLength - 1);
    let randomIndexPerRow = randomNumberWithRange(start, end);

    while (indexesToExclude.indexOf(randomIndexPerRow) === 1)
      randomIndexPerRow = randomNumberWithRange(start, end);

    validIndexes.push(randomIndexPerRow);
  }

  return validIndexes;
}

// Layout
// Generate Tiles for each Dino in Array
function grid(arr) {
  let dinosGrid = '';
  let humanOrName = ''
  arr.map(el => {
    if (el.species.toLowerCase() === 'human' && !el.name) humanOrName = 'Human'
    else humanOrName = el.name
    dinosGrid += `<div class='grid-item'><h3>${
      el.species.toLowerCase() !== 'human' ? el.species : humanOrName
    }</h3><img src='images/${el.species.trim().toLowerCase()}.png'>
    <p>${el.species.toLowerCase() !== 'human' ? el.fact : ''}</p>
    </div>`;
  });
  return dinosGrid;
}

function listenerForButton(targetClass, elementToShowID) {
  document.querySelector(`#${elementToShowID}`).classList.remove('hide');

  // when we remove an element with a listener we have to remove the listener as well
  const btn = document.querySelector(`.${targetClass}`);
  btn.removeEventListener('click', listenerForButton, false);
  btn.remove();

  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
}

// Yes, I could have a button in the HTML template and toggle the class, but... I wanted to practice JS
function createButton(
  wrapper,
  text,
  cssClass,
  parentWrapper,
  elementToShowID,
  prevDinosArr
) {
  const btn = document.createElement(wrapper);
  const btnContent = document.createTextNode(text);
  btn.appendChild(btnContent);
  btn.classList.add(...cssClass);

  const positionTarget = document.querySelector(`#${parentWrapper}`);
  positionTarget.appendChild(btn);

  // we expect the last class is the one we are going to use to identify the element
  btn.addEventListener('click', () => {
    listenerForButton(cssClass[cssClass.length - 1], elementToShowID);
    restoreFacts(prevDinosArr);
  });
}

export function showComparison(
  prevDinosArr,
  dinosArrWithFacts,
  formWrapperId,
  containerId,
  { element, text, classes }
) {
  document.querySelector(`#${formWrapperId}`).classList.add('hide');

  const wrapper = document.querySelector(`#${containerId}`);
  wrapper.innerHTML = grid(dinosArrWithFacts, {
    species: 'Human',
    weight: 200
  });

  createButton(
    element,
    text,
    classes,
    containerId,
    formWrapperId,
    prevDinosArr
  );
}
