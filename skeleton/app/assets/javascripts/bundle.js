/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FTSomething = __webpack_require__(1);
	
	$( () => {
	  $('.follow-toggle').each((index, button) => {
	    return new FTSomething(button);
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map