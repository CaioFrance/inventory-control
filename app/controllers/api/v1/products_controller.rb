class Api::V1::ProductsController < ApplicationController
  include Paginable

  def index
    @products = Product.page(current_page()).per(per_page())

    render json: @products, meta: meta_attributes(@products), adapter: :json
  end
end
