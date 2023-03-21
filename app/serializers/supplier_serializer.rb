class SupplierSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :postal_code, :state, :city
end
