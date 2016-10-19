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
    } else {
      this.$el.text("Follow!");
    }
  }

  setPendingState() {
    // fix following / followed stuffs
  }

  handleClick(){
    // debugger
    this.$el.on("click", (e) => {
      this.setPendingState();
      e.preventDefault();
      let oppositeFollowstate = (this.followState === "followed" ? "unfollowed" : "followed");
      let requestType = (this.followState === "followed" ? "DELETE" : "POST");
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
