class UserFavoriteTeam < ApplicationRecord
  belongs_to :user
  belongs_to :team
  after_destroy :delete_related_notification_preferences

  delegate :slug, to: :team, prefix: true

  private

  def delete_related_notification_preferences
    user.notification_preferences.where(team: team).destroy_all
  end
end
