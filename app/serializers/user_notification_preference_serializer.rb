class UserNotificationPreferenceSerializer < ActiveModel::Serializer
  attributes :callback_url, :created_at, :id, :updated_at, :phone, :email, :user

  has_one :team

end
