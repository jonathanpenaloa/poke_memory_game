/*----- constants -----*/

/* pokemon (name / img / id ) */

const populatePokemonArr = async () => {
    const promises = [];
    for (let i=1; i<=20; i++) {
        const getPokemonCount = Math.floor(Math.random() * 90) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${getPokemonCount}`
        promises.push(fetch(url))
    }
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

const playGame = async () => {
    const playingPokemon = await populatePokemonArr()
    console.log(playingPokemon);

    const pokemonInfoForCard =[]
        playingPokemon.forEach(pokemon => {

            pokemonInfoForCard.push()
            pokemonInfo = new Pokemon(pokemon.id, pokemon.name, pokemon.sprites.front_default)
            pokemonInfoForCard.push(pokemonInfo);
        });
        pokemonInfoForCard.push(...pokemonInfoForCard);

        console.log(pokemonInfoForCard);

        const shuffledPokemonArray = pokemonInfoForCard.sort((a, b) => 0.5 - Math.random());
        console.log(shuffledPokemonArray);
}
playGame()





/*----- state variables -----*/
  // turn
  // board
  // messge
  // points
  // cardCollection
  // winner

/*----- cached elements  -----*/

/* borad */ 
/* playerScore */ 
/* computerScore */ 
 




/*----- event listeners -----*/

/* board.addeventLis */
/* playAgainButton */




/*----- functions -----*/