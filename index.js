/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

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
    for (const game of games) {

        // create a new div element, which will become the game card
        let gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `<h3>${game.name}</h3>
                                <img class="game-img" src="${game.img}">
                                <p>${game.description}</p>`;

        // append the game to the games-container
        gamesContainer.append(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let totalGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `${totalGames.toLocaleString('en-US')}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter((game) => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((game) => game.pledged >= game.goal);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.reduce((acc, game) => {
    if (game.pledged < game.goal) {
        return acc + 1;
    } else {
        return acc;
    }
}, 0);

// unfundedGames = 1;

// create a string that explains the number of unfunded games using the ternary operator
let ternaryString = `Currently, ${(unfundedGames == 1 ? unfundedGames.toLocaleString('en-US') + " game remains unfunded." : unfundedGames.toLocaleString('en-US') + " games remain unfunded.")
                        + " Please help us fund these amazing projects!"}`;

// create a new DOM element containing the template string and append it to the description container
let unfundedTemplate = document.createElement("p");
unfundedTemplate.innerHTML = ternaryString;
descriptionContainer.append(unfundedTemplate);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstDiv = document.createElement("div");
firstDiv.innerHTML = `${first.name}`;
firstGameContainer.append(firstDiv);

// do the same for the runner up item
let secondDiv = document.createElement("div");
secondDiv.innerHTML = `${second.name}`;
secondGameContainer.append(secondDiv);

/************************************************************************************
 * Customizations!!!!!!
 */


// Search bar

const gameSearch = document.getElementById("game-search");

// Filter games to show only those that include given search term
gameSearch.addEventListener("input", () => {
    
    const term = gameSearch.value.toLowerCase();

    const filtered = GAMES_JSON.filter(game => game.name.toLowerCase().includes(term));
    
    deleteChildElements(gamesContainer);

    addGamesToPage(filtered);
});

// Nav bar scrolling

// Store nav-bar boxes
const aboutUs = document.getElementById("about-us");
const stats = document.getElementById("stats");
const ourGames = document.getElementById("our-games");

// Store section headers
const welcomeHeader = document.getElementById("welcome-header");
const statsHeader = document.getElementById("stats-header");
const gamesHeader = document.getElementById("games-header");

// Add event listeners to auto-scroll to the labeled section
aboutUs.addEventListener("click", () => {
    welcomeHeader.scrollIntoView({behavior: "smooth"});
});

stats.addEventListener("click", () => {
    statsHeader.scrollIntoView({behavior: "smooth"});
});

ourGames.addEventListener("click", () => {
    gamesHeader.scrollIntoView({behavior: "smooth"});
});



