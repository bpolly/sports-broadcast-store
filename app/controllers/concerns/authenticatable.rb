class NotAuthorizedException < StandardError; end

module Authenticatable
  extend ActiveSupport::Concern

  included do
    attr_reader :current_user

    before_action :authenticate_user

    rescue_from NotAuthorizedException, with: -> { render json: { error: 'Not Authorized' }, status: 401 }
  end

  private

  def authenticate_user
    @current_user = ApiRequestAuthorizer.new(request.headers).get_user
    raise NotAuthorizedException unless @current_user
  end
end
