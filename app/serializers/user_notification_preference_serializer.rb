class UserNotificationPreferenceSerializer < ActiveModel::Serializer
  attributes :callback_url, :created_at, :id, :updated_at, :phone, :email

  has_one :team
  has_one :user

end
