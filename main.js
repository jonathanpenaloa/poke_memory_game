/*----- cached elements  -----*/

/* borad */ 
const board = document.querySelector(".game-board");

/* playerScore */ 
/* computerScore */ 



/*----- constants -----*/

/* pokemon (name / img / id ) */

const populatePokemonArr = async () => {
    const promises = [];
    for (let i=1; i<=20; i++) {
        const getPokemonCount = Math.floor(Math.random() * 90) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${getPokemonCount}`
        promises.push(fetch(url))
    }
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
                
                let image = document.createElement("img");
                image.setAttribute("src", pokemon.image);
                image.setAttribute("alt", "pokemon name");
                card.appendChild(image);

                let h3 = document.createElement('h3');
                h3.textContent = pokemon.name;
                card.appendChild(h3);

                board.appendChild(card);

                card.addEventListener("click", () => {
                    console.log(pokemon);
                    
                })
            })
        }
        createPokemonCard();
}
playGame()



/*----- state variables -----*/
  // turn
  // board
  // messge
  // points
  // cardCollection
  // winner



/*----- event listeners -----*/

/* playAgainButton */

