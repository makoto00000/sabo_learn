class AddColumnIsNewUserToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :is_new_user, :boolean, default: false, null: false
  end
end
