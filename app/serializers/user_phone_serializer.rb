class UserPhoneSerializer < ActiveModel::Serializer
  attributes  :number,
              :user_id,
              :created_at,
              :updated_at,
              :last_code_generated_at,
              :verified_at,
              :deleted_at

  def verified
    object.verified?
  end

  def deleted
    object.deleted?
  end
end
