class Api::V1::SuppliersController < ApplicationController
  include Paginable

  before_action :find_supplier, only: %i(show update)
  rescue_from ActiveRecord::RecordNotFound, with: :supplier_not_found
  rescue_from ActionController::ParameterMissing do |e|
    params_missing_error(e.message)
  end

  def index
    @suppliers = Supplier.page(current_page()).per(per_page())

    render json: @suppliers, meta: meta_attributes(@suppliers), adapter: :json
  end

  def create
    @supplier = Supplier.new(supplier_params)

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

  private

  def find_supplier
    id = params[:id]

    @supplier = Supplier.find(id)
  end

  def supplier_params
    params.require(:supplier).permit(:address, :city, :name, :postal_code, :state)
  end

  def supplier_not_found
    render json: {
      message: "Supplier with id #{params[:id]} does not exists",
      status: 404
    }, status: :not_found
  end
end
