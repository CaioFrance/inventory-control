class Api::V1::ProductsController < ApplicationController
  include Paginable

  before_action :authorize_request
  before_action :find_product, only: %i(show update destroy)

  def index
    @products = Product.where("user_id = ?", @current_user.id)
                .order("created_at DESC")
                .page(current_page()).per(per_page())

    render json: @products, meta: meta_attributes(@products), adapter: :json
  end

  def create
    @product = Product.new(product_params)
    @product.user = @current_user

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

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: {message: @product.errors.full_messages, status: 400}, status: :bad_request
    end
  end

  def destroy
    @product.destroy
  end

  private

  def find_product
    id = params[:id]

    @product = Product.where("user_id = ?", @current_user.id).find(id)
  end

  def product_params
    params.require(:product).permit(:amount, :description, :name, :unit_price,
                                    :last_entry, :last_outing, :min_amount, :supplier_id)
  end

  def register_product_record(product)
    ProductRecord.create(action: :add, product:, amount: product.amount)
  end
end
