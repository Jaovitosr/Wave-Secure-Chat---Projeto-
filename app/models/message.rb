# Cada mensagem pertence a um único usuário e a uma única sala. Quando
# after_create_commit: aciona o broadcast da mensagem para o socket da sala associada
# broadcast_append_to: adiciona a mensagem ao fluxo de dados que os cliente estão
# recebendo, atualizando em tempo real na view
class Message < ApplicationRecord
  has_one_attached :image
  belongs_to :user
  belongs_to :room
  after_create_commit {broadcast_append_to self.room}
end
