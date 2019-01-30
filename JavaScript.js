console.log('my first game!')
//First define the suits, the card numbers, and the cards array that will store the cards. 
//The count variable is for tracking which card to display on the screen next.

function CreatDeck() {
    let suitValues = ["H", "S", "C", "D"];
    let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = [];
    cardValues.forEach(
        function (value) {
            for (var j = 0; j < suitValues.length; j++) {
                let theSuit = suitValues[j];
                let card = value + theSuit; //skapa kortet.
                deck.push(card);
            }
        });
    return deck;
}

let deck = CreatDeck();
console.log(deck);

// dela kort till två delar
function Deal(theDeck) {
    let playerCards = [];
    let computerCards = [];

    for (var i = 0; i < theDeck.length; i++) {

        if (i % 2 == 0) {
            playerCards.push(theDeck[i]);
        }
        else {
            computerCards.push(theDeck[i]);
        }
    }
    return {
        playerCards: playerCards,
        computerCards: computerCards
    };
}

    //anropa function
    let dealtCards = Deal(deck);
    console.log(dealtCards);


let theGame = {
    score: 0,
    currentComputerCard: undefined,
    ComputerDrawsCard: function (allComputerCards, cardDrawnFunction) {
        // fördröjningsfunction.
        setTimeout(function () {
            //The pop() method removes the last element from an array and returns that element.
            let theCard = allComputerCards.pop();
            cardDrawnFunction(theCard);
        }, 1500);
    }
};

//function ComputerDrawsCard(allComputerCards, cardDrawnFunction) {
       
//                setTimeout(function () {
//                    //The pop() method removes the last element from an array and returns that element.
//                    let theCard = allComputerCards.pop();
//                    cardDrawnFunction(theCard);
//                }, 1500);
//        //Math.floor(Math.random() * 2500)
//        // return allComputerCards.pop();
//}


    
// vi har en func som ta in en varilble och en func som parameters.
function PlayerDrawsCard(allplayerCards, playerDrawFunction) {
        //return allplayerCards.pop();
        setTimeout(function () {
           let playerCard =  allplayerCards.pop();
            playerDrawFunction(playerCard);
        }, 2500);
}

theGame.ComputerDrawsCard(dealtCards.computerCards,
    function (theCard) {
        console.log('this is where the computer card shows up!' + theCard);
        theGame.currentComputerCard = theCard;
    });

PlayerDrawsCard(dealtCards.playerCards,
    function (theCard) {
        console.log('this is where the player card shows up!' + theCard);
        theGame.score += ScoreCards(theCard, theGame.currentComputerCard);
        console.log(theGame.score);
    });

function ScoreCards(card1, card2) {
    let value1 = card1.charAt(0);
    let suit1 = card1.charAt(1);
    let value2 = card2.charAt(0);
    let suit2 = card2.charAt(1);

    if (value1 === value2 || suit1 === suit2) return 1;
    else return -1;
}

    //var thePlayerCard = PlayerDrawsCard(dealtCards.playerCards);
    //console.log(theComputerCard);
    //console.log(thePlayerCard);
    //console.log(dealtCards);

    

    //let score = 0;
    //for (var i = 0; i < 4; i++) {
    //    theComputerCard = ComputerDrawsCard(dealtCards.computerCards);
    //    thePlayerCard = PlayerDrawsCard(dealtCards.playerCards);
    //    let scoreDelta = ScoreCards(thePlayerCard, theComputerCard);
    //    score += scoreDelta;
    //    console.log(scoreDelta);
    //}






