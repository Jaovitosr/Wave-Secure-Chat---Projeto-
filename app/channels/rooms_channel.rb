class RoomsChannel < ApplicationCable::Channel

  def subscribed
    # stream_from "some_channel"
    stream_from "RoomChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    # room = Room.find_by(id: data['room'])
    # user = User.find_by(id: data['user'])
    puts data
    # @message = Message.create!(content: data['message'], user_id: data['user'], room_id: data['room'])
    # RoomsChannel.broadcast_to(room, message: @message.content, username: room.user.username)
  end
end
