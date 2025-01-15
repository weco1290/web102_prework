/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  // create a new div element, which will become the game card
  // add the class game-card to the list
  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")
  // append the game to the games-container

  // Select the container where the games will be added
  const gamesContainer = document.querySelector("#games-container");

  // Loop over each game in the array
  games.forEach((game) => {
    // Create a new div element for the game card
    const gameCard = document.createElement("div");

    // Add the class "game-card" to the new div
    gameCard.classList.add("game-card");

    // Set the inner HTML to display the game information
    // Assuming each game object has `name`, `image`, and `description` properties
    gameCard.innerHTML = `
          <img src="${game.image}" alt="${game.name}" />
          <h3>${game.name}</h3>
          <p>${game.description}</p>
      `;

    // Append the game card to the games container
    gamesContainer.appendChild(gameCard);
  });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */
const games = GAMES_JSON;
// Step 1: Grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Step 2: Use reduce() to count the total number of contributions (sum of backers)
const totalContributions = games.reduce(
  (total, game) => total + game.backers,
  0
);

// Step 3: Set the inner HTML of contributionsCard using a template literal
contributionsCard.innerHTML = `Total Contributions: ${totalContributions.toLocaleString()}`;

// Step 4: Grab the amount raised card
const raisedCard = document.getElementById("total-raised");

// Step 5: Use reduce() to calculate the total amount raised (sum of pledged amounts)
const totalAmountRaised = games.reduce(
  (total, game) => total + game.pledged,
  0
);

// Step 6: Set the inner HTML of raisedCard using a template literal
raisedCard.innerHTML = `Total Amount Raised: $${totalAmountRaised.toLocaleString()}`;

// Step 7: Grab the number of games card
const gamesCard = document.getElementById("num-games");

// Step 8: Set the inner HTML of gamesCard to the number of games
gamesCard.innerHTML = `Number of Games: ${games.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// Show only unfunded games
function filterUnfundedOnly() {
  // Clear existing elements
  deleteChildElements(gamesContainer);

  // Filter games that have not met their funding goal
  const unfundedGames = games.filter((game) => game.pledged < game.goal);

  // Add unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
  // Clear the games container
  deleteChildElements(gamesContainer);

  // Filter games that have met or exceeded their funding goal
  const fundedGames = games.filter((game) => game.pledged >= game.goal);

  // Add the funded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", () => {
  deleteChildElements(gamesContainer);
  addGamesToPage(games); // Adds all games to the DOM
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const unfundedGamesCount = games.filter(
  (game) => game.pledged < game.goal
).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesMessage =
  unfundedGamesCount === 1
    ? `There is 1 unfunded game. Consider supporting it to help reach its goal!`
    : `There are ${unfundedGamesCount.toLocaleString()} unfunded games. Consider supporting them to help reach their goals!`;

// create a new DOM element containing the template string
const descriptionElement = document.createElement("p");
descriptionElement.textContent = unfundedGamesMessage;

// append the new element to the description container
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledged game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `🏆 Top Game: ${
  firstGame.name
} - Pledged: $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

// create a new element to hold the name of the second top pledged game, then append it to the correct element
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `🥈 Runner-up: ${
  secondGame.name
} - Pledged: $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);
