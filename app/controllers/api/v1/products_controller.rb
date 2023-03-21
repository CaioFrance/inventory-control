class Api::V1::ProductsController < ApplicationController
  include Paginable

  before_action :find_product, only: %i(show)

  def index
    @products = Product.page(current_page()).per(per_page())

    render json: @products, meta: meta_attributes(@products), adapter: :json
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      register_product_record(@product)
      render json: @product, status: :created
    else
      render json: {message: @product.errors.full_messages, status: 400}, status: :bad_request
    end
  end

  def show
    render json: @product
  end

  private

  def find_product
    id = params[:id]

    @product = Product.find(id)
  end

  def product_params
    params.require(:product).permit(:amount, :description, :name, :unit_price,
                                    :last_entry, :last_outing, :min_amount, :supplier_id)
  end

  def register_product_record(product)
    ProductRecord.create(action: :add, product:, amount: product.amount)
  end
end
