class ChangeDefaultUsersIsNewUser < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :is_new_user, from: false, to: true
  end
end
