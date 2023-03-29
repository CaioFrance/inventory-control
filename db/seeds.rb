# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

100.times do
  Supplier.create!(
    address: Faker::Address.full_address,
    city: Faker::Address.city,
    name: Faker::Name.name,
    postal_code: Faker::Address.postcode,
    state: Faker::Address.state
  )
end

suppliers = Supplier.all

500.times do
  Product.create!(
    amount: Faker::Number.number(digits: 3),
    min_amount: Faker::Number.number(digits: 2),
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph,
    unit_price: Faker::Commerce.price(range: 0..10.0),
    supplier: suppliers.sample,
    last_entry: Faker::Date.between(from: '2010-01-01', to: '2023-12-31'), 
    last_outing: Faker::Date.between(from: '2010-01-01', to: '2023-12-31') 
  )
end