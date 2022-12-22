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
    games.forEach((game) => {
        var div = document.createElement("div");
        $(div).addClass("game-card");
        $(div)[0].innerHTML = `
        <img src=${game.img} class="game-img" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>`
        $('#games-container').append(div)
    })

    // create a new div element, which will become the game card


    // add the class game-card to the list


    // set the inner HTML using a template literal to display some info 
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")


    // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);
$(contributionsCard)[0].innerHTML = `${totalContributions.toLocaleString('en-US')}`

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
$(raisedCard)[0].innerHTML = `$${totalRaised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

$(gamesCard)[0].innerHTML = `${GAMES_JSON.length}`
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unFundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal)
    // use filter() to get a list of games that have not yet met their goal
    addGamesToPage(unFundedGames)

    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal)
    // use filter() to get a list of games that have met or exceeded their goal
    addGamesToPage(fundedGames)

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((acc, game) => {
    return game.pledged < game.goal ? acc + 1 : acc
}, 0)

const totalAmountRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged
}, 0)

const totalGamesCount = GAMES_JSON.reduce((acc) => {
    return acc + 1
}, 0)

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalAmountRaised.toLocaleString('en-US')} has been raised for ${totalGamesCount} games. Currently, ${unfundedGamesCount} ${unfundedGamesCount > 1 ? 'games' : 'game'} remains unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = `<p>${displayStr}</p>`
$(descriptionContainer)[0].innerHTML += descriptionElement

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [{ name: topFundedGameName }, { name: secondTopFundedGameName }] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
$(firstGameContainer)[0].innerHTML += `<p>${topFundedGameName}</p>`
$(secondGameContainer)[0].innerHTML += `<p>${secondTopFundedGameName}</p>`

// do the same for the runner up item

// Function to scroll to top
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// On scroll show the button
window.onscroll = function () {
    // Get the button to scroll to the top
    var topbutton = document.getElementById("return-to-top");
    // When the user scrolls down 20px from the top of the document, show the button
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbutton.hidden = false;
    }
    // Otherwise, hide the button
    else {
        topbutton.hidden = true;
    }
};

const returnToTopBtn = document.getElementById("return-to-top");
returnToTopBtn.addEventListener("click", topFunction)
