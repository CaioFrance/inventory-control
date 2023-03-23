class ApplicationController < ActionController::Base
  rescue_from ActionController::ParameterMissing, with: :params_missing_error
  rescue_from ActiveRecord::RecordNotFound do |e|
    record_not_found_error(e.message)
  end

  def not_found
    render json: {error: "Page not found", status: 404}, status: :not_found
  end

  protected

  def params_missing_error()
    render json: {message: 'Require all parameters', status: 400}, status: :bad_request
  end

  def record_not_found_error(message)
    render json: {message:,status: 404}, status: :not_found
  end

  def authorize_request
    header = request.headers['Authorization']
    token = header.split.last if header

    begin
      @decoded = JsonWebToken.decode(token)
      user_id = @decoded[:user_id]
      @current_user = User.find(user_id)
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render_unauthorized_json('Token invalid')
    end
  end

  def render_unauthorized_json(message)
    render json: {
      message:,
      status: 401
    }, status: :unauthorized
  end

end
