class UserNotificationPreferenceSerializer < ActiveModel::Serializer
  attributes :callback_url, :created_at, :email, :id, :phone, :updated_at, :user_id

  has_one :team
end
