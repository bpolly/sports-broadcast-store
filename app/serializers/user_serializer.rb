class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest

  has_one :user_phone
  has_one :user_email
end
