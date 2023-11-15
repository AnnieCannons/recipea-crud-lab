const fs = require('fs');

const dataFilePath = 'recipea-data.json';

const readAllRecipes = () => {
  try {
    const recipesData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(recipesData);
  } catch (error) {
    return [];
  }
};

const writeRecipes = (recipes) => {
  const recipesData = JSON.stringify(recipes, null, 2);
  fs.writeFileSync(dataFilePath, recipesData, 'utf8');
};

const readRecipe = (index) => {
  const recipes = readAllRecipes();
  if (index >= 0 && index < recipes.length) {
    console.log(recipes[index]);
  } else {
    console.log('Recipe not found at the specified index.');
  }
};

const createRecipe = (name, cookingMethod, ingredients) => {
    const recipes = readAllRecipes();
    const newRecipe = { name, cookingMethod, ingredients };
    recipes.push(newRecipe);
    writeRecipes(recipes);
    console.log('Recipe created successfully!');
};

const updateRecipe = (index, name, cookingMethod, ingredients) => {
  const recipes = readAllRecipes();
  if (index >= 0 && index < recipes.length) {
    recipes[index] = { name, cookingMethod, ingredients };
    writeRecipes(recipes);
    console.log('Recipe updated successfully!');
  } else {
    console.log('Recipe not found at the specified index.');
  }
};

const deleteRecipe = (index) => {
  const recipes = readAllRecipes();
  if (index >= 0 && index < recipes.length) {
    recipes.splice(index, 1);
    writeRecipes(recipes);
    console.log('Recipe deleted successfully!');
  } else {
    console.log('Recipe not found at the specified index.');
  }
};

const nameFilter = (keyword) => {
  const recipes = readAllRecipes();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log(filteredRecipes);
};

const cookingMethodFilter = (method) => {
  const recipes = readAllRecipes();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.cookingMethod.toLowerCase() === method.toLowerCase()
  );
  console.log(filteredRecipes);
};

const ingredientFilter = (ingredient) => {
  const recipes = readAllRecipes();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.map(i => i.toLowerCase()).includes(ingredient.toLowerCase())
  );
  console.log(filteredRecipes);
};

const command = process.argv[2];

if (command === 'read') {
  const index = parseInt(process.argv[3], 10);
  if (!isNaN(index)) {
    readRecipe(index);
  } else {
    const recipes = readAllRecipes();
    console.log(recipes);
  }
} else if (command === 'create') {
  const name = process.argv[3];
  const cookingMethod = process.argv[4];
  const ingredients = process.argv.slice(5);
  createRecipe(name, cookingMethod, ingredients);
} else if (command === 'update') {
  const index = parseInt(process.argv[3], 10);
  const name = process.argv[4];
  const cookingMethod = process.argv[5];
  const ingredients = process.argv.slice(6);
  updateRecipe(index, name, cookingMethod, ingredients);
} else if (command === 'delete') {
  const index = parseInt(process.argv[3], 10);
  deleteRecipe(index);
} else if (command === 'name-filter') {
  const keyword = process.argv[3];
  nameFilter(keyword);
} else if (command === 'cooking-method-filter') {
  const method = process.argv[3];
  cookingMethodFilter(method);
} else if (command === 'ingredient-filter') {
  const ingredient = process.argv[3];
  ingredientFilter(ingredient);
} else {
  console.log('Invalid command. Please use "read", "create", "update", "delete", "name-filter", "cooking-method-filter", or "ingredient-filter".');