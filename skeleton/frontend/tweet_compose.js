class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$submit = this.$el.children("#submit");
    this.submit();
  }

  submit() {
    let that = this;
    this.$submit.on("click", (e) => {
      e.preventDefault();
      let formData = that.$el.serialize();
      that.toggleForm(true);
      $.ajax({
        url: "/tweets",
        type: "POST",
        dataType: "JSON",
        data: formData,
        success: function(data) {
          alert("made it here!");
          // that.handleSuccess(data);
        },
        error: function() {
          alert("yo tweet didnt make it");
        }
      });
    });
  }

  // handleSuccess(data) {
  //   clearInput();
  //   that.toggleForm(false);
  // }

  clearInput() {

  }

  toggleForm(disable) {
    let allInputs = $( ".tweet-compose :input" );
    allInputs.each((index, input) => {
      $(input).attr("disabled", disable);
    });
    debugger
  }

}

module.exports = TweetCompose;
