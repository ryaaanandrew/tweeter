$(function() {

    $('textarea').on('input', function(){
        let text = $(this);
        let counter = $(this).parent('form').find('.counter');
        let length = text.val().length;
        let countdown = 140 - length;
        
        if (countdown < 50) {
            counter.css('color', 'darkred');
        } else if (countdown < 99) {
            counter.css('color', 'green');
        }

        counter.html(countdown);
    });

    
});