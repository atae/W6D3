class FeedsController < ApplicationController
  before_action :require_logged_in!

  LIMIT = 15

  def show
    # debugger
    params[:max_created_at] ||= 20.minutes.ago
    @feed_tweets =
      current_user.feed_tweets(LIMIT, params[:max_created_at]).includes(:user)

    respond_to do |format|
      format.html { render :show }
      format.json { render :show }
    end
  end
end
