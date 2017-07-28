$(function(){
    $('#slider-vertical').slider({
        orientation: 'vertical',
        range: "min",
        min: 0,
        max: 100,
        value: 60,
        slide: function( event, ui ) {
            $('#amount').val(ui.value);
            $(this).find('.ui-slider-handle').text(ui.value);
        },
        create: function(event, ui) {
            var v=$(this).slider('value');
            $(this).find('.ui-slider-handle').text(v);
        }
    });    
});
