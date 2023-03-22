class ApplicationController < ActionController::Base
  rescue_from ActionController::ParameterMissing, with: :params_missing_error
  rescue_from ActiveRecord::RecordNotFound do |e|
    record_not_found_error(e.message)
  end

  def not_found
    render json: {error: "Page not found", status: 404}, status: :not_found
  end

  def params_missing_error()
    render json: {message: 'Require all parameters', status: 400}, status: :bad_request
  end

  def record_not_found_error(message)
    render json: {message:,status: 404}, status: :not_found
  end
end
