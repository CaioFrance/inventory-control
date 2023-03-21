class ProductSerializer < ActiveModel::Serializer
  attributes  :amount, :description, :name, :unit_price,
              :last_entry, :last_outing, :min_amount,
end
