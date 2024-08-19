class MessagesController < ApplicationController

    def create
      @current_user = current_user
      @message = @current_user.messages.create(msg_params.merge(room_id: params[:room_id]))
    end

    private

        def msg_params
        params.require(:message).permit(:content, :image)
        end
  end
