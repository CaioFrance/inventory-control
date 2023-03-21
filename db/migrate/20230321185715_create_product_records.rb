class CreateProductRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :product_records do |t|
      t.string :amount
      t.integer :action
      t.references :products, null: false, foreign_key: true

      t.timestamps
    end
  end
end
