/**
 * functions are reusable piece of code
 * types
 *
 * named function
 * anonymous function
 * IIFE Immediately Invoked Function
 * closure /lambda functions
 *
 */

// ## Function declaration

function cookPasta() {
  console.log("cook pasta and pepper mint");
}

// ## Anatomy of a function
function cookSomePasta(numberOfPasta) {
  console.log(`I am cooking ${numberOfPasta} pasta and pepper mint`);
}

// #  function with a return type
function calculateIngredientsNeeded(numberOfPasta) {
  const isValidInput = validateUsersInput(numberOfPasta) == "valid";
  if (!isValidInput) {
    throw Error("bad data");
  }

  const ingredients = {
    egg: numberOfPasta,
    meatballs: numberOfPasta,
    pasta: numberOfPasta,
    tomatoesInGramme: numberOfPasta,
  };

  return ingredients;
}

// cookSomePasta(5)
// cookSomePasta(200)

const numOfServings = 45;
const ingredientsRequired = calculateIngredientsNeeded(numOfServings);

console.log(ingredientsRequired);

///
function validateUsersInput(number) {
  if (number >= 1) {
    return "valid";
  } else {
    return "invalid";
  }
}

/////////////////

function isDivisible(a, b) {
  const sum = a + b;
  if (sum % 2 === 0) {
    return sum * 2;
  }
  return sum * 10;
}

const showResult = isDivisible(4, 5);
console.log(showResult);
