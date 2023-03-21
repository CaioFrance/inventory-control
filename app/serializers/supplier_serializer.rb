class SupplierSerializer < ActiveModel::Serializer
  attributes :name, :address, :postal_code, :state, :city
end
