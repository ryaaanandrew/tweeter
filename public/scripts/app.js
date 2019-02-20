
$(function() {

    function loadTweets() {
        $.getJSON('/tweets')
        .then( data => { 
            console.log('this works?', data);
            renderTweets(data);
        });
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
                        <p>${content}</p>
                    </article>

                    <footer>
                        <div class="tweet-created">${createdAt}</div>
                    </footer>`

        return HTML;  
    };

    function renderTweets(tweetData) {
        let render; 
        for(let i = 0; i < tweetData.length; i++) {
            render = createTweetElement(tweetData[i]);
            $('.tweet-container').append(render);
        }
        return render;
    } 

    let $form = $('#form');

    $form.on('submit', function(e) {
        e.preventDefault();
        let formData = $('#form').serialize();

        $.ajax('/tweets', {method: 'POST', data: formData})
        .done(function() {
            console.log('request works');
        });
        console.log('submit button worked');
    });    

    loadTweets()
});


