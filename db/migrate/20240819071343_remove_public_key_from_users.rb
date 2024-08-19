class RemovePublicKeyFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :public_key, :string
  end
end
