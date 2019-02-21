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
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    function timeSince(date) {
          let seconds = Math.floor((new Date() - date) / 1000);
        
          let interval = Math.floor(seconds / 31536000);
        
          if (interval > 1) {
            return interval + " years";
          }
          interval = Math.floor(seconds / 2592000);
          if (interval > 1) {
            return interval + " months";
          }
          interval = Math.floor(seconds / 86400);
          if (interval > 1) {
            return interval + " days";
          }
          interval = Math.floor(seconds / 3600);
          if (interval > 1) {
            return interval + " hours";
          }
          interval = Math.floor(seconds / 60);
          if (interval > 1) {
            return interval + " minutes";
          }
          return Math.floor(seconds) + " seconds";
        }

    function createTweetElement(tweetData) {
        let name = tweetData.user.name;
        let regularAvatar = tweetData.user.avatars.regular;
        let handle = tweetData.user.handle;
        let content = tweetData.content.text;
        let createdAt = tweetData.created_at;
        let HTML = `<section class="tweet"> 
                        <header>
                            <img src="${regularAvatar}" class="user-avatar"></img>
                            <h1>${name}</h1>
                            <div class="username">${handle}</div>
                        </header>

                        <article class="tweet-main">
                            <p>${escape(content)}</p>
                        </article>

                        <footer class="tweet-footer">
                            <div class="tweet-created">${timeSince(createdAt)}</div>
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-retweet"></i>
                            <i class="fas fa-biohazard"></i>
                        </footer>
                    </section>`
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
            $('textarea').empty();
        }

    });    

    let $compose = $('#compose-tweet');

    $compose.on('click', function() {
        $('.new-tweet').slideToggle('slow', function(){
        });
        $('textarea').focus();
    });
    
});


