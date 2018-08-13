class UserEmailSerializer < ActiveModel::Serializer
  attributes  :id,
              :number,
              :user_id,
              :created_at,
              :updated_at,
              :last_code_generated_at,
              :verified_at,
              :verified

  def verified
    object.verified?
  end
end
