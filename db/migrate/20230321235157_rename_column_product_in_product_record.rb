class RenameColumnProductInProductRecord < ActiveRecord::Migration[7.0]
  def change
    rename_column :product_records, :products_id, :product_id
  end
end
