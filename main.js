/*----- cached elements  -----*/
const board = document.querySelector(".game-board");
const playerPoints = document.querySelector(".player-points");
const computerPoints = document.querySelector(".computer-points");
const gameMessage = document.querySelector('h1');

/*----- state variables -----*/
  // turn
  // messge
  // points
  // cardCollection 
  // winner

/*----- constants -----*/

const populatePokemonArr = async () => {
    const promises = [];
    const randomNums = []
    while (randomNums.length < 20) {
        const randomInt = Math.floor(Math.random() * 90) + 1;
        randomNums.includes(randomInt) ? null : randomNums.push(randomInt);
    }
    randomNums.forEach(num => {
        const url = `https://pokeapi.co/api/v2/pokemon/${num}`
        promises.push(fetch(url))  
    })
    console.log(promises);
    // console.log(promises);
    let pokemonResponses = await Promise.all(promises);
    let jsonPromises = []
    pokemonResponses.forEach((responseObject) => {
        jsonPromises.push(responseObject.json())
    })
    // console.log(jsonPromises);
    let finalPokemonData = await Promise.all(jsonPromises)
    // console.log(finalPokemonData);
    // here you actually want to just create an array of the form[0]
    return finalPokemonData
}


class Pokemon {
    constructor(id, name, image) {
        this.id = id
        this.name = name
        this.image = image
    }
}

// playerChoice = {
//     firstChoice: undefined,
//     secoundChoice: undefined
// }
// computerChoice = {
//     firstChoice: undefined,
//     secoundChoice: undefined
// }

selectedChoices = {
    turn: 1,
    firstChoice: undefined,
    secoundChoice: undefined
}

const playGame = async () => {
    const playingPokemon = await populatePokemonArr()

    const pokemonInfoForCard = [];

        playingPokemon.forEach(pokemon => {

            pokemonInfo = new Pokemon(pokemon.id, pokemon.name, pokemon.sprites.front_default)
            pokemonInfoForCard.push(pokemonInfo);
        });
       
        pokemonInfoForCard.push(...pokemonInfoForCard);
 
        const shuffledPokemonArray = pokemonInfoForCard.sort((a, b) => 0.5 - Math.random());
        console.log(shuffledPokemonArray);

        const createPokemonCard = () => {
            shuffledPokemonArray.forEach( (pokemon, idx) => {
                let card = document.createElement('div');
                card.classList.add("pokemon-card");
                
                //dive to hide card on load
                let cardCover = document.createElement('div');
                cardCover.classList.add("hidden-card");
                
                let image = document.createElement("img");
                image.setAttribute("src", pokemon.image);
                image.setAttribute("alt", "pokemon name");
                card.appendChild(image);

                let h3 = document.createElement('h3');
                h3.textContent = pokemon.name;
                card.appendChild(h3);

                
                board.appendChild(card);
                
                // adding div to hide card
                card.appendChild(cardCover);

                card.addEventListener("click", (e) => {
                    e.preventDefault();

                    // turn = 1 {
                    
                    if(selectedChoices.firstChoice === undefined) {
                        selectedChoices.firstChoice = pokemon.id;
                        //change class to show card
                        console.log(selectedChoices);
                    } else {
                        if(selectedChoices.secoundChoice === undefined)
                        selectedChoices.secoundChoice = pokemon.id;
                        // change class to show the card 
                        console.log(selectedChoices);
                    } 

                    // comapare the choices for a match
                    while (selectedChoices.firstChoice === selectedChoices.secoundChoice) {

                    }
                        // if true 
                            // keep class of card to show 
                        
                        // else 
                            // change to hidden
                    
                    // add point to the dom element ++ 


                    // change the seleted turn = 0
                        // reset value of selected choices to undefined 
                            // add the values to the object 
                
                })
            })
        }
        createPokemonCard();

}
playGame()







/*----- event listeners -----*/

/* playAgainButton */

