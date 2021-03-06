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
	const UsersSearch = __webpack_require__(2);
	const TweetCompose = __webpack_require__(3);
	const InfiniteTweets = __webpack_require__(4);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class FollowToggle {
	  constructor(el){
	    this.$el = $(el);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FTSomething = __webpack_require__(1);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map