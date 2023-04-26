/*----- cached elements  -----*/
const board = document.querySelector(".game-board");
const playerPoints = document.querySelector(".player-points > span");
const computerPoints = document.querySelector(".computer-points > span");
const gameMessage = document.querySelector('h1');

/*----- state variables -----*/
  let points = 0; 
  let winner = null;

/*----- game starts -----*/

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

let selectedChoices = {
    turn: null,
    firstChoice: undefined,
    firstChoiceCover: undefined,
    secoundChoice: undefined,
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

        const createPokemonCard = () => {
            shuffledPokemonArray.forEach( (pokemon, idx) => {
                let card = document.createElement('div');
                card.classList.add("pokemon-card");
                
           
                let cardCover = document.createElement('img');
                cardCover.setAttribute("src", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA")
                cardCover.setAttribute("atl", "hide-image-cover")
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
                    cardCover.classList.add("hidden");

                    const checkForMatch = () => {
                        if (selectedChoices.firstChoice === selectedChoices.secoundChoice) {
                            points++;
                            playerPoints.innerHTML = points;
                            gameMessage.innerHTML = `You caugh ${pokemon.name}!`;
                        } else {
                            gameMessage.innerHTML = "Sorry not a match!";
                            setTimeout(() => {
                                selectedChoices.firstChoiceCover.classList.remove('hidden');
                                cardCover.classList.remove("hidden");
                            }, 1000)
                        } 
                        selectedChoices.firstChoice = undefined;
                        selectedChoices.secoundChoice = undefined;
                        selectedChoices.turn = 0;

                    }
                    
                    if(selectedChoices.firstChoice === undefined) {
                        selectedChoices.turn = 1;
                        selectedChoices.firstChoice = pokemon.id;
                        selectedChoices.firstChoiceCover = cardCover;

                    } else if(selectedChoices.secoundChoice === undefined) {
                        selectedChoices.secoundChoice = pokemon.id;
                        console.log(selectedChoices);
                        checkForMatch();
                    }  
                
                })
            })
        }
        createPokemonCard();

}
playGame()


/* playAgainButton */

