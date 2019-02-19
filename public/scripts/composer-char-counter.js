$(function() {

    // $('.tweet-form').on('keypress', function(){
    //     let textCounter = $(this);

    //     if (textCounter < 25) {
    //         $(this).find('.counter').css('color', 'darkred');
    //         //alt -- add new .class to counter to change colour
    //     }

    //     if (textCounter <= 0) {
    //         $('.tweet-form textarea').attr('disabled', true);
    //     } else {
    //         textCounter -= 1;
    //         $(this).find('.counter').html(textCounter);
    //     }
    // });

        $('textarea').on('input', function(){
        let text = $(this);
        let counter = $(this).parent('form').find('.counter');
        let length = text.val().length;
        let countdown = 140 - length;
        
        if (countdown < 50) {
            counter.css('color', 'darkred');
        } 
        counter.html(countdown)
        
    });


    
 





});