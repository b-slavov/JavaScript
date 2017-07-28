var i = 0,
    before = [],
    after = [],
    value = [],
    number = '';

function resetVal() {
    i = 0;
    before = [];
    after = [];
    value = [];
    number = '';
    $("#number").val("");
    $(".amount").html("");
}

function addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$("#number").on("keyup", function (e, v) {
    if ((e.which >= 48) && (e.which <= 57)) {
        number = String.fromCharCode(e.which);
        $(this).val("");
        value.push(number);
        before.push(value[i]);
        if (i > 1) {
            after.push(value[i - 2]);
            before.splice(0, 1);
        }
        var val_final = after.join("") + "." + before.join("");
        $(this).val(addComma(val_final));
        i++;
        $(".amount").html(" " + $(this).val());
    } else {
        resetVal();
    }
});

$(".ui-input-text .ui-input-clear").on("click", function () {
    resetVal();
});
