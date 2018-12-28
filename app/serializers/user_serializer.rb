class UserSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :user_type, :phone, :email

  def phone
    UserPhoneSerializer.new(object.phone, { root: false } ) if object.phone
  end

  def email
    UserEmailSerializer.new(object.email, { root: false } )
  end

  def user_type
    object.user_type.name
  end
end
