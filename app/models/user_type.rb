class UserType < ApplicationRecord
  REGULAR = 'Regular'
  ADMIN = 'Admin'

  def self.regular
    find_by(name: REGULAR)
  end

  def self.admin
    find_by(name: ADMIN)
  end
end
