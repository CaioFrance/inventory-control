class Api::V1::AuthenticationController < ApplicationController
  def login
    @user = User.find_by_username(params[:username])

    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode({user_id: @user.id})
      time = 24.hours.from_now

      render json: {
        token:,
        username: @user.username
      }
    else
      render_unauthorized_json('User is invalid')
    end
  end

  private

  def login_params
    params.permit(:username, :password)
  end
end