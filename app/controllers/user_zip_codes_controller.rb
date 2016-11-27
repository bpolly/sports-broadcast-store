class UserZipCodesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_filter :verify_authenticity_token

  def update
    user = UserZipCode.find_or_create_by(amz_id: Digest::SHA256.hexdigest(params["amz_id"]))
    user.update_attributes(zip: params["zip_code"])
    render :nothing => true, :status => 200
  end
end
