$(document).ready(function () {
    $("form").submit(function (event) {
        console.log("success!");

        let textInput = $('#textId');
        let textCell = $("<div>");

        textCell.text(textInput.val());
        $("#span").append(textCell);
        //if ($("input:first").val() === "correct") {
        //    $("span").text("Validated...").show();
        //    return;
        //}

        //$("span").text("Not valid!").show().fadeOut(1000);
        event.preventDefault();
    });
});