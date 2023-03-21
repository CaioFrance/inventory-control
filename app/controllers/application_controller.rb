class ApplicationController < ActionController::Base
  def not_found
    render json: {error: "Page not found", status: 404}, status: :not_found
  end
end
