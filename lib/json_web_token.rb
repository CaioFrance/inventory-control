class JsonWebToken
  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, ENV.fetch('JWT_SECRET', '1'))
  end

  def self.decode(token)
    data = JWT.decode(token, ENV.fetch('JWT_SECRET', '1'))[0]

    ActiveSupport::HashWithIndifferentAccess.new(data)
  end
end