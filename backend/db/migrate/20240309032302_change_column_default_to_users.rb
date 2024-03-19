class ChangeColumnDefaultToUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :coin, from: nil, to: 0
  end
end
