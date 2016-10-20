class InfiniteTweets{
  constructor($el) {
    this.$el = $el;
    this.$ul = this.$el.children('#feed');
    this.fetchTweets();
    this.maxCreatedAt = null;
  }

  fetchTweets() {
    $('.fetch-more').on('click', (e) => {
      e.preventDefault();
      let that = this;

      if(this.maxCreatedAt) {
        $.ajax({
          url: "/feed",
          type: "GET",
          dataType: "JSON",
          data: { max_created_at: this.maxCreatedAt },
          success: (listOfTweets) => {
            this.maxCreatedAt = listOfTweets[listOfTweets.length-1].created_at;
            that.addTweets(listOfTweets);
          },
          error: () => {
            alert("ERROR");
          }
        });

      } else {
        $.ajax({
          url: "/feed",
          type: "GET",
          dataType: "JSON",
          success: (listOfTweets) => {
            debugger
            this.maxCreatedAt = listOfTweets[listOfTweets.length-1].created_at;
            that.addTweets(listOfTweets);
          },
          error: () => {
            alert("ERROR");
          }
        });
      }

    });


  }

  addTweets(listOfTweets) {
    listOfTweets.forEach((tweet) => {
      let tweetContent = tweet.content;
      let $li = $(`<li>${tweetContent}</li>`);
      this.$ul.append($li);
    });
  }
}

module.exports = InfiniteTweets;
