class ApplicationController < ActionController::Base
  def not_found
    render json: {error: "Page not found", status: 404}, status: :not_found
  end

  def params_missing_error(message)
    render json: {message:, status: 400}, status: :bad_request
  end
end
