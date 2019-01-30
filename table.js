$(function () {
    console.log("This should fire after form submission");

    //$("fieldset").submit(function (e) {
    //    console.log("This suceess!");
    //    e.preventDefault();
    //});
    $("#addRows").click(function (e) {
        var name = $("#name").val();
        let satisfactioness = $("input[type=radio]").val();

        let favrcolor = $("input[type=color]").val();
        var markup = "<tr><td>" + name + "</td><td>" + favrcolor + "</td><td>" + satisfactioness + "</td></tr>";
        $("table tbody").append(markup);

        e.preventDefault();
    });
   
});   

    // Find and remove selected table rows
    //$(".delete-row").click(function () {
    //    $("table tbody").find('input[name="record"]').each(function () {
    //        if ($(this).is(":checked")) {
    //            $(this).parents("tr").remove();
    //        }
    //    });
    //});



//$(function () {
//    $("#theField").click(function (e) {
//        let textInput = $('#name');
//        let colorInput = $('#colorId');

//        let newRow = $('<tr>');
//        let textCell = $('<td>');
//        let colorCell = $('<td>');

//        textCell.text(textInput.val());
//        colorCell.text(colorInput.val());
//        newRow.append(textCell);
//        newRow.append(colorCell);

//        $('tbody').append(newRow);

//        e.preventDefault();
//    });
//});
