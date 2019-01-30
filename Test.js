$(function () {
    var btnNewGame = $("#btnNewGame");
    var btnPause = $("#btnPause");
    var gameArea = $("main");
    var playedCardMessage = $(".playedCardMessage");
    var playerCard = $("#playerCard");

    const baseUrl = "https://deckofcardsapi.com/api/deck/";
    let newDeckUrl = baseUrl + "new/shuffle/";
    let deckId;
    let drawCardUrl;
    let currentPlayerCard;
    let currentComputerCard;
    let paused = false;
    let elapsedTime = 0;
    let playerPoints = 0;
    let computerDrawInterval;
    let timerId;

    gameArea.hide();
    playedCardMessage.hide();

    function StartTimer() {
        startTime = new Date;
        timeElapsed = elapsedTime;

        if (timerId != undefined)
            clearInterval(timerId);

        timerId = setInterval(function () {
            let time = new Date - startTime + timeElapsed;
            $(".timer").text(msToReadableTime(time));
            elapsedTime += 1000;
        }, 1000);

        btnPause.text("Paus");
    };

    function msToReadableTime(ms) {
        let minutes = ("00" + Math.floor(ms / 1000 / 60)).slice(-2);
        let seconds = ("00" + Math.floor(ms / 1000 % 60)).slice(-2);

        return minutes + ":" + seconds;
    }

    btnNewGame.click(function () {
        clearInterval(computerDrawInterval);

        $.getJSON(newDeckUrl,
            { deck_count: 1 })
            .done(function (data) {
                deckId = data.deck_id;

                drawCardUrl = baseUrl + deckId + "/draw/";

                playerDrawCard();
                computerDrawCard(0);
            });

        paused = false;
        gameArea.show();
        elapsedTime = 0;
        playerPoints = 0;
        displayPoints();
        StartTimer();
    });

    function computerDrawCard(timeDelay) {
        if (paused)
            return
        else {
            setTimeout(function () {
                $.getJSON(drawCardUrl, { count: 1 })
                    .done(function (computerDraw) {
                        currentComputerCard = computerDraw.cards[0];
                        $("#computerCard").attr("src", currentComputerCard.image);

                        if (paused)
                            return
                        else
                            computerDrawCard(Math.random() * 1000 + 1000);
                    });
            }, timeDelay);
        }
    }

    function playerDrawCard() {
        $.getJSON(drawCardUrl,
            { count: 1 })
            .done(function (drawData) {
                currentPlayerCard = drawData.cards[0];
                setPlayerCard(currentPlayerCard);
            });
    }

    function setPlayerCard(card) {
        playerCard.attr("src", card.image);
    }

    btnPause.click(function () {
        if (paused) {
            StartTimer();
            paused = false;
            computerDrawCard(Math.random() * 1000 + 1000);
        }
        else {
            clearInterval(timerId);
            btnPause
                .text("Unpause")
                .addClass("unPause");
            paused = true;
        }

    });

    playerCard.click(function () {
        if (paused)
            return
        else {
            playerCard.addClass("playedCard");

            setTimeout(function () {
                playerCard.removeClass("playedCard");
            }, 500);


            playerPoints += matchCards(currentComputerCard.code, currentPlayerCard.code);
            displayPoints();

            playerDrawCard();
        }
    });

    function displayPoints() {
        $("#playerPoints").html("Points: " + playerPoints);
    }

    function matchCards(card1, card2) {
        if (card1.charAt(0) === card2.charAt(0) || card1.charAt(1) === card2.charAt(1))
            return 1;
        else
            return -1;
    }

    // Feedback form!!!
    $("#feedbackForm").submit(function (e) {
        e.preventDefault();
        let nameInput = $("#name");
        let happinessInput = $("#happiness");
        let colorInput = $("#favoriteColor");
        let newRow = $('<tr>');
        let nameCell = $('<td>');
        let happinessCell = $("<td>");
        let colorCell = $('<td>');

        nameCell.text(nameInput.val());
        happinessCell.text(happinessInput.val());
        colorCell.text(colorInput.val());
        colorCell.css('background-color', colorInput.val());

        newRow.append(nameCell);
        newRow.append(happinessCell);
        newRow.append(colorCell);
        $('tbody').append(newRow);

        // const allData = $("#feedbackForm").serializeArray();
        // allData innehåller en vektor med formens alla name/value-par
        allData.forEach(function (data) {
            console.log(data);
        });

    })
});



//hämta ut en element!
//let el = document.querySelector("main div");

//console.log(el);
////lägg till en click handler;

//el.addEventListener("click", function (event) {
//    setTimeout(function () {
//        console.log(event);
//        let newDiv = document.createElement("div");
//        el.appendChild(newDiv);
//        newDiv.innerHTML = "<strong>VERY IMPORTANT!</strong>";
//    }, 1000);
//});

//alert("before?")
//window.alert = function (message) {
//    console.log("Alert!!!!!!" + message);
//}


//alert("After?")


//$(function () {
//    $(".row").hide();
//});
