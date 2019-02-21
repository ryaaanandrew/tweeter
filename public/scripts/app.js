$(function() {
    loadTweets()

    function loadTweets() {
        $('.tweet-container').empty();
        $.getJSON('/tweets')
        .then( data => { 
            renderTweets(data);
        });
    };

    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    function createTweetElement(tweetData) {
        let name = tweetData.user.name;
        let regularAvatar = tweetData.user.avatars.regular;
        let handle = tweetData.user.handle;
        let content = tweetData.content.text;
        let createdAt = tweetData.created_at;
        let HTML = `<header>
                        <img src="${regularAvatar}" class="user-avatar"></img>
                        <h1>${name}</h1>
                        <div class="username">${handle}</div>
                    </header>

                    <article class="tweet-main">
                        <p>${escape(content)}</p>
                    </article>

                    <footer>
                        <div class="tweet-created">${createdAt}</div>
                    </footer>`

        return HTML;  
    };


    function renderTweets(tweetData) {
        let render; 
        for(let i = tweetData.length - 1; i >= 0; i--) {
            render = createTweetElement(tweetData[i]);
            $('.tweet-container').append(render);
        }
        return render;
    } 

    let $form = $('#form');
    

    $form.on('submit', function(e) {
        e.preventDefault();
        let formData = $('#form').serialize();
        let $charLength = $('textArea').val().length;
        
        if ($charLength === 0) {
            $('#error').css('display', 'inline-block');
        } else if ($charLength > 140) {
            console.log ('tweet too large');
            $('#error').css('display', 'inline-block');
            $('#error').html('Exceeded tweet character limit!')
        } else {
            $.ajax('/tweets', {method: 'POST', data: formData})
            .done(function() {
                loadTweets()
            });
        }

    });    

    let $compose = $('#compose-tweet');

    $compose.on('click', function() {
        $('.new-tweet').toggle();
    });
    
});


