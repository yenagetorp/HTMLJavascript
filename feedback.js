
let deckId;
let playerCard;
let computerCard;
let score = 0;
const baseUrl = 'https://deckofcardsapi.com/api/deck/';
$(function () {
    $("#newGame").click(function () {
        $(function () {
            $("#Played").hide();
            score += matchCards(playerCard, computerCard);
            displayPoints();
        });
        $.getJSON(baseUrl + 'new/shuffle/', { deck_count: 1 })
            .done(function (data) {
                deckId = data.deck_id; //deklarera ID.
                //spelaren få kort.
                $.getJSON(baseUrl + deckId + '/draw/')
                    .done(function (drawData) {
                        let theCard = drawData.cards[0];
                        setPlayerCard(theCard);
                        //playerCard = draw.cards[0].code;
                        ////alert(playerCard);
                        //$('#playerCard img.card')
                        //    .attr('src', drawData.cards[0].image);
                        drawComputerCard();
                    });
            });
    });
});


function setPlayerCard(card) {
    $(function () {
        $("#playerCard").click(function () {
            $("#Played").show();

            playerCard = card.code;
            $('#playerCard img.card').attr('src', card.image);
            //for rotation
            $('#playerCard').addClass("rotation");
            score += matchCards(computerCard, playerCard)
            displayPoints();

        });
        $.getJSON(baseUrl + 'new/shuffle/')
            .done(function (data) {
                deckId = data.deck_id; //deklarera ID.
                //spelaren få kort.
                $.getJSON(baseUrl + deckId + '/draw/')
                    .done(function (drawData) {
                        let newCard = drawData.cards[0];
                        setPlayerCard(newCard);
                    });
                displayPoints();
            });
    });
}

function drawComputerCard() {
    setTimeout(function () {
        $.getJSON(baseUrl + deckId + '/draw/')
            .done(function (computerDraw) {
                // alert(computerDraw.remaining);
                computerCard = computerDraw.cards[0].code;
                $('#computerCard img.card').attr('src', computerDraw.cards[0].image);
                drawComputerCard();
            });
    }, 1000);
}
function displayPoints() {
    $("#points").html("points: " + score);
}
function matchCards(card1, card2) {
    if (card1.charAt(0) === card2.charAt(0) || card1.charAt(1) === card2.charAt(1))
        return 1;
    else
        return -1;
}




$().ready(function () {
    var initialDate = new Date();
    setInterval(function () {
        var currentDate = new Date();
        $("#time").html(msToTime(currentDate - initialDate));
    }, 1000);

    $("#newGame").on("click", function () {
        initialDate = new Date();
    });
});

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

/* Fedback*/




//<thead>
//    <tr>
//        <th id="th">Name</th>
//        <th id="th"><time id="date">Date</time></th>
//        <th id="th">Points</th>
//        <th id="th"><time>Time</time></th>
//    </tr>
//</thead>



























//$('form').submit(function (e) {
//    let textInput = $('#textId');
//    let colorInput = $('#colorId');
//    let newRow = $('<tr>');
//    let textCell = $('<td>');
//    let colorCell = $('<td>');

//    textCell.text(textInput.val());
//    colorCell.text(colorInput.val());
//    colorCell.css('background-color', colorInput.val());

//    newRow.append(textCell);
//    newRow.append(colorCell);
//    $('tbody').append(newRow);

//    e.preventDefault();
//});