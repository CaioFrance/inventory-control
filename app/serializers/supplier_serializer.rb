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
#
class SupplierSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :postal_code, :state, :city
end
