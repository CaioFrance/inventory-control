class Api::V1::SuppliersController < ApplicationController
  include Paginable

  before_action :authorize_request
  before_action :find_supplier, only: %i[show update destroy]

  def index
    @suppliers = Supplier.where("user_id = ?", @current_user.id)
                .order("created_at DESC")
                .page(current_page()).per(per_page())

    render json: @suppliers, meta: meta_attributes(@suppliers), adapter: :json
  end

  def all_without_pagination
    @suppliers = Supplier.where("user_id = ?", @current_user.id)
                .order("created_at DESC")

    render json: @suppliers
  end

  def create
    @supplier = Supplier.new(supplier_params)

    @supplier.user = @current_user

    if @supplier.save
      render json: @supplier, status: :created
    else
      render json: {message: @supplier.errors.full_messages, status: 400}, status: :bad_request
    end
  end

  def show
    render json: @supplier
  end

  def update
    if @supplier&.update(supplier_params)
      render json: @supplier
    else
      render json: {message: @supplier.errors.full_messages, status: 400}, status: :bad_request
    end
  end

  def destroy
    begin
      @supplier.destroy
    rescue ActiveRecord::InvalidForeignKey => e
      contains_products()
    end
  end

  private

  def find_supplier
    id = params[:id]

    @supplier = Supplier.where("user_id = ?", @current_user.id).find(id)
  end

  def supplier_params
    params.require(:supplier).permit(:address, :city, :name, :postal_code, :state)
  end

  def contains_products
    render json: {message: "Supplier contains products. Impossible remove."}, status: :bad_request
  end
end
