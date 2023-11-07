arrayOfRecipes = [
  ['Aloo Tikki', '100-150', '20-30', 'Flour', 'Oil', 'Potato', 'Spices'],
  ['Aloo Pakora', '100-150', '5-10', 'Flour', 'Oil', 'Potato', 'Spices'],
  ['Aloo Paratha', '200-300', '20-30', 'Flour', 'Oil', 'Potato', 'Spices'],
  ['Dahi Puri', '100-150', '5-10', 'Potato', 'Spices', 'Yogurt'],
  ['Onion Bhaji', '100-150', '20-30', 'Flour', 'Oil', 'Onion', 'Spices'],
  ['Onion Pakora', '100-150', '10-15', 'Flour', 'Oil', 'Onion', 'Spices'],
  ['Onion Rings', '150-200', '20-30', 'Flour', 'Oil', 'Onion', 'Spices'],
  ['Pakoras', '75-100', '10-15', 'Flour', 'Oil', 'Paneer', 'Spices'],
  ['Paneer Bhurji', '275-300', '25-30', 'Onions', 'Paneer', 'Spices'],
  ['Paneer Pakora', '150-200', '20-30', 'Flour', 'Oil', 'Paneer', 'Spices'],
  ['Paneer Tikka', '200-250', '20-30', 'Paneer', 'Spices', 'Yogurt'],
  ['Potato Chaat', '100-150', '15-20', 'Potato', 'Spices', 'Yogurt'],
  ['Potato Samosa', '150-250', '30-40', 'Flour', 'Oil', 'Potato', 'Spices']
]


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


function filterRecipes(arrayOfRecipes, sortedCheckedCheckboxNames) {
  const matchingRecipes = [];

  for (const recipe of arrayOfRecipes) {
    const ingredients = new Set(recipe.slice(3));

    if (isSubset(new Set(sortedCheckedCheckboxNames), ingredients)) {
      matchingRecipes.push(recipe.slice(0, 3));
    }
  }

  return matchingRecipes;
}

function isSubset(setA, setB) {
  for (const item of setB) {
    if (!setA.has(item)) {
      return false;
    }
  }
  return true;
}


findRecipesButton.addEventListener('click', () => {
  const sortedCheckedCheckboxNames = Array.from(checkedCheckboxNames).sort();
  
  const matchingRecipes = filterRecipes(arrayOfRecipes, sortedCheckedCheckboxNames);
  for (let i = 1; i <= 3; i++) {
    const outpElement = document.getElementById('op' + i);

    if (outpElement) {
      if (i <= matchingRecipes.length) {
        const recipeData = matchingRecipes[i - 1][0];
        const recipeCal = matchingRecipes[i - 1][1];
        const recipeMin = matchingRecipes[i - 1][2];
        outpElement.innerHTML = `${recipeData}<br>Calories: ${recipeCal} Cals<br>Cooking Time: ${recipeMin} Mins`;
      } else {
        outpElement.textContent = 'No More Recipes (T___T)';
      }
    }
  }
});

