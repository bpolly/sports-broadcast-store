class UserZipCode < ApplicationRecord
  def self.find_by_amz_id(amz_id)
    amz_id ? UserZipCode.find_by(amz_id: Digest::SHA256.hexdigest(amz_id)) : nil
  end

  def self.get_offset_by_amz_id(amz_id)
    user = UserZipCode.find_by_amz_id(amz_id)
    user&.zip ? lookup_tz_offset(user) : default_offset
  end

  def self.default_offset
    Time.zone.now.utc_offset / 3600
  end



  private
  def self.lookup_tz_offset(user)
    Timezone.lookup(*(user.zip.to_s).to_latlon.split.map(&:to_f)).utc_offset / 3600
  end
end
