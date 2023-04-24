/*----- constants -----*/

/* pokemon (name / img) */

// const playingPokemon = []



// for (let i=1; i<20; i++) {
//     const getPokemonCount = Math.floor(Math.random() * 90)
//     const url = `https://pokeapi.co/api/v2/pokemon/${getPokemonCount}`
//     const getPokemon = async () => {
//         const responds = await fetch(url)
//         const obj = await responds.json()
//         playingPokemon.push(obj);
//     }   
//     getPokemon()
// }
// console.log(playingPokemon);
const populatePokemonArr = async () => {
    const promises = [];
    for (let i=1; i<=20; i++) {
        const getPokemonCount = Math.floor(Math.random() * 90) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${getPokemonCount}`
        promises.push(fetch(url))
    }
    console.log(promises);
    let pokemonResponses = await Promise.all(promises);
    let jsonPromises = []
    pokemonResponses.forEach((responseObject) => {
        jsonPromises.push(responseObject.json())
    })
    console.log(jsonPromises);
    let finalPokemonData = await Promise.all(jsonPromises)
    console.log(finalPokemonData);
    // here you actually want to just create an array of the form[0]
    return finalPokemonData
}
const playGame = async () => {
    const playingPokemon = await populatePokemonArr()
    console.log(playingPokemon);

    const nameAndImage = []

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