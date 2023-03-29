# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  amount      :integer
#  description :text
#  last_entry  :date
#  last_outing :date
#  min_amount  :integer
#  name        :string
#  unit_price  :decimal(10, 2)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  supplier_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_products_on_name         (name)
#  index_products_on_supplier_id  (supplier_id)
#  index_products_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (supplier_id => suppliers.id)
#  fk_rails_...  (user_id => users.id)
#
class Product < ApplicationRecord
  belongs_to :supplier
  belongs_to :user
  has_many :product_records, dependent: :destroy

  validates :amount, :description, :last_entry, presence: true
  validates :last_outing, :min_amount, :name, :unit_price, presence: true
end
