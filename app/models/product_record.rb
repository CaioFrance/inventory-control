# == Schema Information
#
# Table name: product_records
#
#  id          :bigint           not null, primary key
#  action      :integer
#  amount      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  products_id :bigint           not null
#
# Indexes
#
#  index_product_records_on_products_id  (products_id)
#
# Foreign Keys
#
#  fk_rails_...  (products_id => products.id)
#
class ProductRecord < ApplicationRecord
  belongs_to :product

  enum :action, %i(add remove)
end
