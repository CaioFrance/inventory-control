# == Schema Information
#
# Table name: suppliers
#
#  id          :bigint           not null, primary key
#  address     :string
#  city        :string
#  name        :string
#  postal_code :string
#  state       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_suppliers_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class SupplierSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :postal_code, :state, :city
end
