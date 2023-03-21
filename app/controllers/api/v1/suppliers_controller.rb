class Api::V1::SuppliersController < ApplicationController
  include Paginable

  def index
    @suppliers = Supplier.page(current_page()).per(per_page())

    render json: @suppliers, meta: meta_attributes(@suppliers), adapter: :json
  end

  def create
    @supplier = Supplier.new(supplier_params)

    if @supplier&.save
      render json: @supplier, status: :created
    else
      render json: @supplier.errors.full_messages, status: :bad_request
    end
  end

  private

  def supplier_params
    params.require(:supplier).permit(:address, :city, :name, :postal_code, :state)
  end
end
