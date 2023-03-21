# == Schema Information
#
# Table name: product_records
#
#  id         :bigint           not null, primary key
#  action     :integer
#  amount     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  product_id :bigint           not null
#
# Indexes
#
#  index_product_records_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#
class ProductRecord < ApplicationRecord
  belongs_to :product

  enum :action, %i(add remove)
end
