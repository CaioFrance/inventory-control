class Api::V1::SuppliersController < ApplicationController
  include Paginable

  def index
    @suppliers = Supplier.page(current_page()).per(per_page())

    render json: @suppliers, meta: meta_attributes(@suppliers), adapter: :json
  end
end
