class RoomsController < ApplicationController

  before_action :require_login

  def index
    @current_user = current_user
    @room = Room.new
    redirect_to '/signin' unless @current_user
    @rooms = Room.public_rooms
    @users = User.all_except(@current_user)
  end

  def create
    @room = Room.create(name: params["room"] ["name"])
    if @room.save
      respond_to do |format|
        format.turbo_stream
        format.html {redirect_to @room}
      end
    end
  end

  def show
    @current_user = current_user
    @single_room = Room.find(params[:id])
    @rooms = Room.public_rooms
    @users = User.all_except(@current_user)
    @message = Message.new
    @messages = @single_room.messages
    @room = Room.new
    render "index"
  end


  def require_login
    redirect_to root_path unless current_user
  end

end

  
