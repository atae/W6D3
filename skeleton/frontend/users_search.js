const FTSomething = require('./follow_toggle');

class UsersSearch {
  constructor($el) {
    // debugger
    this.$el = $el;
    this.$input = this.$el.children().children(".search-query");
    this.$ul = this.$el.children(".users");
    this.handleInput();

  }

  handleInput() {
    let that=this;
    this.$input.on('input', (e) => {
      // debugger
      let currentInput = that.$input;
      $.ajax({
        url: '/users/search',
        dataType: 'JSON',
        data: currentInput.serialize(),
        success: function(data) {
          console.log(data);
          that.renderResults(data);
        },
        error: function(data) {
          alert("we didnt make it!");
        }

      });
    });
  }

  renderResults(suggestedUsers) {
    this.$ul.empty();
    suggestedUsers.forEach((user) => {
      let username = user.username;
      let userId = user.id;
      let followed = (user.followed) ? "followed" : "unfollowed" ;
      let li = $(`<li><a href="/user/${userId}">${username}</a></li>`);
      let button = $(`<button class="follow-toggle" type="button" name="follow" data-user-id=${userId}
          data-initial-follow-state=${followed}></button>`);
          new FTSomething(button);
      this.$ul.append(li);
      this.$ul.append(button);
    });
  }
}
module.exports = UsersSearch;
