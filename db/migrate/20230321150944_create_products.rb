class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, index: true
      t.text :description
      t.decimal :unit_price, precision: 10, scale: 2
      t.integer :amount
      t.integer :min_amount
      t.date :last_outing
      t.date :last_entry

      t.timestamps
    end
  end
end
