let arrayOfRecipes = []; // Initialize an empty array to store recipes

//Code to load the JSON file
fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    arrayOfRecipes = data; // Update the arrayOfRecipes with the loaded data

  })
  .catch(error => {
    console.error('Failed to load the JSON file:', error);
  });

// Get references to all the checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Get a reference to the "Find Recipes" button
const findRecipesButton = document.querySelector('.button-19');

// Initialize an empty array to store the names of checked checkboxes
const checkedCheckboxNames = new Set(); // Initialize a Set to store unique IDs

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    const id = checkbox.getAttribute('id');

    if (checkbox.checked) {
      checkedCheckboxNames.add(id); // Add the ID to the Set
    } else {
      checkedCheckboxNames.delete(id); // Remove the ID from the Set
    }
  });
});

//Defining a function to filter the recipes which can be made with the given ingredients
function filterRecipes(arrayOfRecipes, CheckedCheckboxNames) {
  const matchingRecipes = [];

  for (const recipe of arrayOfRecipes) {                                  //read the first value from JSON file
    const ingredients = new Set(recipe.ingredients);                      

    if (isSubset(new Set(CheckedCheckboxNames), ingredients)) {           //check if the the ingredients are present
      matchingRecipes.push(recipe);
    }
  }

  return matchingRecipes;
}

function isSubset(setA, setB) {                                             // funtion to check if it is a subset
  for (const item of setB) {
    if (!setA.has(item)) {
      return false;
    }
  }
  return true;
}


findRecipesButton.addEventListener('click', () => {                         // function for the "Find Recipies" Button
  
  const matchingRecipes = filterRecipes(arrayOfRecipes, checkedCheckboxNames);      
  const matchingRecipesLength = matchingRecipes.length;
  for (let i = 1; i <= 3; i++) {                                            // printing the first 3 matching recipies 
    const outpElement = document.getElementById('op' + i);

    if (outpElement) {
      if (i <= matchingRecipesLength) {
        const recipe = matchingRecipes[i - 1];
        outpElement.innerHTML = `${recipe.name}<br>Calories: ${recipe.calories} Cals<br>Cooking Time: ${recipe.cookingTime} Mins`;
      } else {
        outpElement.textContent = 'No More Recipes (T___T)';
      }
    }
  }
});
