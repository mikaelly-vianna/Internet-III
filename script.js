const colors = ["blue", "orange", "green", "purple", "white", "black"];
const cardsArray = [...colors, ...colors];
const grid = document.getElementById("grid");
const resultDisplay = document.getElementById("result");
const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-button");
let chosenCards = [];
let chosenCardsIds = [];
let cardsWon = 0;
let gameStarted = false;


cardsArray.sort(() => 0.5 - Math.random());

function createBoard() {
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement("div");
        card.setAttribute("data-id", i);
        card.classList.add("card");
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    if (!gameStarted) return;

    let cardId = this.getAttribute("data-id");
    chosenCards.push(cardsArray[cardId]);
    chosenCardsIds.push(cardId);
    this.style.backgroundColor = cardsArray[cardId];
    this.classList.add("flipped");

    if (chosenCards.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const [optionOneId, optionTwoId] = chosenCardsIds;

    if (chosenCards[0] === chosenCards[1] && optionOneId !== optionTwoId) {
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        cardsWon += 2;
    } else {
        cards[optionOneId].style.backgroundColor = "#ccc";
        cards[optionTwoId].style.backgroundColor = "#ccc";
        cards[optionOneId].classList.remove("flipped");
        cards[optionTwoId].classList.remove("flipped");
    }

    chosenCards = [];
    chosenCardsIds = [];

    if (cardsWon === cardsArray.length) {
        resultDisplay.textContent = "Parabéns! Você encontrou todas as cores!";
        resultDisplay.style.display = "block";
    }
}

startButton.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    grid.style.display = "grid";
    createBoard();
    gameStarted = true;
});
