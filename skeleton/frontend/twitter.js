const FTSomething = require('./follow_toggle');

$( () => {
  $('.follow-toggle').each((index, button) => {
    return new FTSomething(button);
  });
});
