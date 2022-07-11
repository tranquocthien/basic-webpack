// Create Human Object

// I decided to use a constructor function
export function Human({ name, height, weight, diet }) {
  this.species = 'Human'
  this.name = name;
  this.height = {
    ...height
  };
  this.weight = weight;
  this.diet = diet;
}
