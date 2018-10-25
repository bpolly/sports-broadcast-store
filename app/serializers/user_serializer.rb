class UserSerializer < ActiveModel::Serializer
  attributes :id, :created_at

  has_one :phone
  has_one :email
end
