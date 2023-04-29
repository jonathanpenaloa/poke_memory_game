/*----- cached elements  -----*/
const board = document.querySelector(".game-board");
const playerPointsEl = document.querySelector(".player-points > span");
const AiPointsEl = document.querySelector(".computer-points > span");
const gameMessage = document.querySelector('h1');

/*----- state variables -----*/
  let playerScore = 0; 
  let winner = null;
  let AiScore = 0;

/*----- game starts -----*/

const populatePokemonArr = async () => {
    const promises = [];
    const randomNums = []
    while (randomNums.length < 5) {
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
    constructor(id, name, image, isCopy = false) {
        this.id = id
        this.name = name
        this.image = image
        this.isCopy = isCopy;
    }
}

let selectedChoices = {
    firstChoice: undefined,
    firstChoiceCover: undefined,
    secoundChoice: undefined,
    alreadySelectedIdxs: []
}

const playGame = async () => {
    const playingPokemon = await populatePokemonArr()

    const pokemonInfoForCard = [];

        playingPokemon.forEach(pokemon => {

            pokemonInfo = new Pokemon(pokemon.id, pokemon.name, pokemon.sprites.front_default, false)
            pokemonInfoForCard.push(pokemonInfo);
        });
       
        let copyarr = pokemonInfoForCard.map((pokemon) => {
            
            let pokemonCopy = {
                ...pokemon,
                isCopy: true
            }
            return pokemonCopy;
        });


        pokemonInfoForCard.push(...copyarr);
  
        const shuffledPokemonArray = pokemonInfoForCard.sort((a, b) => 0.5 - Math.random());

        const checkForWinner = () => {
            if(selectedChoices.alreadySelectedIdxs.length === shuffledPokemonArray.length) {
                if (playerScore > AiScore) {
                    gameMessage.innerText = "You win!!"
                } else if (playerScore < AiScore) {
                    gameMessage.innerText = "Ai wins!!"
                } else {
                    gameMessage.innerText = "its a tie.."
                }
            }
          }

        const createPokemonCard = () => {

            shuffledPokemonArray.forEach( (pokemon, idx) => {
                pokemon.idx = idx;
        
                let card = document.createElement('div');
                card.classList.add("pokemon-card");
                
           
                let cardCover = document.createElement('img');
                cardCover.setAttribute("src", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA")
                cardCover.setAttribute("atl", "hide-image-cover")
                cardCover.classList.add("hidden-card", "card-cover");
                
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
                
                    cardCover.classList.add("show");
                const checkForMatch = () => {
                    if (selectedChoices.firstChoice.id === selectedChoices.secoundChoice.id) {
                        playerScore++;
                        checkForWinner()
                        playerPointsEl.innerHTML = playerScore;
                        gameMessage.innerHTML = `You caugh ${pokemon.name}!`;
                        selectedChoices.alreadySelectedIdxs.push(selectedChoices.firstChoice.idx, selectedChoices.secoundChoice.idx);
                        console.log(selectedChoices.alreadySelectedIdxs)
                        checkForWinner()

                    } else {
                        gameMessage.innerHTML = "Sorry not a match!";
                        setTimeout(() => {
                            selectedChoices.firstChoiceCover.classList.remove('show');
                            cardCover.classList.remove("show");
                        }, 1000)
                        
                        setTimeout(() => {
                            makeAiMove()
                        }, 2000);
                    } 
                    selectedChoices.firstChoice = undefined;
                    selectedChoices.secoundChoice = undefined;
                    }
                    
                    if (selectedChoices.firstChoice === undefined) {
                        selectedChoices.turn = 1;
                        selectedChoices.firstChoice = pokemon;
                        selectedChoices.firstChoiceCover = cardCover;

                    } else if (selectedChoices.secoundChoice === undefined) {
                        selectedChoices.secoundChoice = pokemon;
                        // check if pokemon have same name
                        if(selectedChoices.firstChoice.name === selectedChoices.secoundChoice.name) {
                            if(selectedChoices.firstChoice.isCopy !== selectedChoices.secoundChoice.isCopy) {
                                checkForMatch()
                            } 
                        } else {
                            checkForMatch()
                        }
                    }  
                })
            })
        } 



        const makeAiMove = () => {
            let selectedIdxs= [];
            let count = 0;
            while(selectedIdxs.length < 2 && count < 200)   {
                let randomIdx = Math.floor(Math.random() * shuffledPokemonArray.length);
                count++
                if(!selectedChoices.alreadySelectedIdxs.includes(randomIdx)) {
                    selectedChoices.alreadySelectedIdxs.push(randomIdx)
                    selectedIdxs.push(randomIdx);
                    // console.log(randomIdx);
                }
            }

            // select array of hidden covers
              const covers = document.querySelectorAll('.card-cover')
              console.log(covers); 
            
              covers[selectedIdxs[0]].classList.add("show")
        
              covers[selectedIdxs[1]].classList.add("show")

              if(shuffledPokemonArray[selectedIdxs[0]].id === shuffledPokemonArray[selectedIdxs[1]].id) {
                  AiScore++
                  AiPointsEl.innerHTML = AiScore;
                  gameMessage.innerHTML = `Ai caugh a pokemon!`;
                  selectedChoices.firstChoice = shuffledPokemonArray[selectedIdxs[0]]
                  selectedChoices.secoundChoice = shuffledPokemonArray[selectedIdxs[1]]
                  selectedChoices.alreadySelectedIdxs.push(selectedIdxs[0], selectedIdxs[1]);


                  selectedChoices.firstChoice = undefined;
                  selectedChoices.secoundChoice = undefined;
                } else {
                    selectedChoices.alreadySelectedIdxs.pop()
                    selectedChoices.alreadySelectedIdxs.pop()
                    gameMessage.innerHTML = `Sorry Ai, not a match`
                    gameMessage.innerHTML = `Chose another Pokemon`
                    setTimeout(() => {
                        covers[selectedIdxs[0]].classList.remove("show")
                        covers[selectedIdxs[1]].classList.remove("show")
                    }, 1000)
                    checkForWinner()
                }

            
        }
        createPokemonCard();
} 

playGame()


/* playAgainButton */

