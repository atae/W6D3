const FTSomething = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');
const InfiniteTweets = require('./infinite_tweets');
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

$( () => {
  return new InfiniteTweets($('.InfiniteTweets'));
});
