class FollowToggle {
  constructor($el){
    this.$el = $($el);
    this.userId = parseInt(this.$el.attr('data-user-id'));
    this.followState = this.$el.attr('data-initial-follow-state');
    this.render();
    this.handleClick();
  }

  render(){
    if(this.followState === "followed") {
      this.$el.text("Unfollow!");
      this.$el.attr("disabled", false);
    } else if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.attr("disabled", false);
    } else if (this.followState === "following") {
      this.$el.text("Following...");
      this.$el.attr("disabled", true);
    } else {
      this.$el.text("Unfollowing...");
      this.$el.attr("disabled", true);
    }
  }

  setPendingState() {
    // fix following / followed stuffs
    if (this.followState === "followed") {
      this.followState = 'unfollowing';
    } else {
      this.followState = 'following';
    }
  }

  handleClick(){
    // debugger
    this.$el.on("click", (e) => {
      this.setPendingState();
      this.render();
      // debugger
      e.preventDefault();
      let oppositeFollowstate = (this.followState === "following" ? "followed" : "unfollowed");
      let requestType = (this.followState === "following" ? "POST" : "DELETE");
        $.ajax({
          url: `/users/${this.userId}/follow`,
          type: `${requestType}`,
          dataType: "JSON",
          success: function(){
            this.followState = `${oppositeFollowstate}`;
            this.render();
          }.bind(this),
          error() {
            alert('Failed!');
          }
        });
    });
  }
}

module.exports = FollowToggle;
