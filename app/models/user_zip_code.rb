class UserZipCode < ActiveRecord::Base
  def self.find_by_amz_id(amz_id)
    amz_id ? UserZipCode.find_by(amz_id: Digest::SHA256.hexdigest(amz_id)) : nil
  end

  def self.get_offset_by_amz_id(amz_id)
    user = UserZipCode.find_by_amz_id(amz_id)
    user ? user.zip.to_gmt_offset.to_i : 0
  end
end
