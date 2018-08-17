class UserNotificationPreferenceSerializer < ActiveModel::Serializer
  attributes :callback_url, :created_at, :id, :updated_at, :user_id, :phone, :email

  has_one :team
end
