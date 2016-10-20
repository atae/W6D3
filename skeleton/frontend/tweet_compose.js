class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$submit = this.$el.children("#submit");
    this.$textarea = $("#tweetContent");
    this.$counter = $(".chars-left");
    this.submit();
    this.charCounter();
  }

  charCounter() {
    let that = this;
    this.$textarea.on("input", (e) => {
      let charCount = that.$textarea.val().length;
      that.$counter.text(`${140-charCount} characters remaining.`);
    });
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
          that.handleSuccess(data);
        },
        error: function() {
          alert("yo tweet didnt make it");
        }
      });
    });
  }

  handleSuccess(data) {
    console.log(data);
    this.clearInput();
    this.toggleForm(false);
    let userId = data.user_id;
    let username = data.user.username;
    let createdAt = data.created_at;
    let $li = $(`<li>${data.content} -- <a href="/user/${userId}">${username}</a> -- ${createdAt}</li>`);
    let $ul = $('#feed');
    if(data.mentions.length > 0) {
      let mentionedId = data.mentions[0].user_id;
      let mentionedName = data.mentions[0].user.username;
      let $nested_ul = $(`<ul><li><a href="/user/${mentionedId}">${mentionedName}</a></li></ul>`);
      $li.append($nested_ul);
    }
    $ul.prepend($li);
  }

  clearInput() {
    let allInputs = $( ".tweet-compose :input" );
    this.$textarea.val('');
    $('#selectUserIds').val('');
  }

  toggleForm(disable) {
    let allInputs = $( ".tweet-compose :input" );
    allInputs.each((index, input) => {
      $(input).attr("disabled", disable);
    });
  }

}

module.exports = TweetCompose;
