class UserNotificationPreferenceSerializer < ActiveModel::Serializer
  attributes :callback_url, :created_at, :id, :updated_at, :user_id

  has_one :team
  has_one :user_phone
  has_one :user_email
end
