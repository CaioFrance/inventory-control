class Api::V1::ProductsController < ApplicationController
  include Paginable

  def index
    @products = Product.page(current_page()).per(per_page())

    render json: @products, meta: meta_attributes(@products), adapter: :json
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: {message: @product.errors.full_messages, status: 400}, status: :bad_request
    end
  end

  private

  def product_params
    params.require(:product).permit(:amount, :description, :name, :unit_price,
                                    :last_entry, :last_outing, :min_amount, :supplier_id)
  end
end
