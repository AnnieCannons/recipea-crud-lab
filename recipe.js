const fs = require('fs');

const dataFilePath = 'recipes.json';


function readAllRecipes() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const recipes = JSON.parse(data);
    console.log('All Recipes:');
    console.log(recipes);
  } catch (error) {
    console.error('Error reading recipes:', error.message);
  }
}


function readRecipe(recipeName) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const recipes = JSON.parse(data);
    const recipe = recipes.find((r) => r.name === recipeName);

    if (recipe) {
      console.log('Single Recipe:', recipe);
    } else {
      console.log('Recipe not found.');
    }
  } catch (error) {
    console.error('Error reading recipes:', error.message);
  }
}


function createRecipe(newRecipe) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const recipes = JSON.parse(data);

    recipes.push(newRecipe);

    fs.writeFileSync(dataFilePath, JSON.stringify(recipes, null, 2));

    console.log('Recipe created successfully!');
  } catch (error) {
    console.error('Error creating recipe:', error.message);
  }
}


readAllRecipes();


readRecipe('RecipeName');


createRecipe({
  name: 'NewRecipe',
  ingredients: ['Ingredient1', 'Ingredient2'],
  instructions: 'Step 1: Do something\nStep 2: Do something else',
});

