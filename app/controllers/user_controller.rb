class UserController < ApplicationController
  def new
    @users = User.new
  end

  def create

    @users = User.new(user_params)
    if @users.save
      redirect_to '/signin'
    else
      render 'new'
    end
  end

  def index
    @users = User.all
  end

  private
  def user_params
    params.require(:users).permit(:username)
  end
end
