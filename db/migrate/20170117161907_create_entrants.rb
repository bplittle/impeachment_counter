class CreateEntrants < ActiveRecord::Migration
  def change
    create_table :entrants do |t|

      t.timestamps null: false
      t.string :email
      t.string :name
      t.datetime :guess
    end
  end
end
