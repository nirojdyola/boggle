class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :words

      t.timestamps
    end
    add_index :games, :words, unique: true
  end
end
