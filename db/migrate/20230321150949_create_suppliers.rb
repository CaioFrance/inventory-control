class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.string :name
      t.string :address
      t.string :postal_code
      t.string :city
      t.string :state

      t.timestamps
    end
  end
end
