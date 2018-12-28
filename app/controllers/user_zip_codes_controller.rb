class UserZipCodesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def show
    user = UserZipCode.find_or_create_by(amz_id: Digest::SHA256.hexdigest(params["amz_id"]))
    render :json => {"zip_code": user ? user.zip : 0}
  end

  def update
    user = UserZipCode.find_or_create_by(amz_id: Digest::SHA256.hexdigest(params["amz_id"]))
    user.update_attributes(zip: params["zip_code"])
    render :nothing => true, :status => 200
  end
end
