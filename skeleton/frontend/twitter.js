const FTSomething = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');

$( () =>{
  return new UsersSearch($('.users-search'));
});

$( () => {
  $('.follow-toggle').each((index, button) => {
    return new FTSomething(button);
  });
});

$( () =>{
    return new TweetCompose($('.tweet-compose'));
});
