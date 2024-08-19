class Message < ApplicationRecord
  has_one_attached :image
  belongs_to :user
  belongs_to :room
  after_create_commit {broadcast_append_to self.room}
end
