class ProductSerializer < ActiveModel::Serializer
  attributes  :id, :amount, :description, :name, :unit_price,
              :last_entry, :last_outing, :min_amount
  
  has_one :supplier
end
