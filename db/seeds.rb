# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Load all files from /seeds directory
Dir[File.join(Rails.root, 'db', 'seeds', 'team_seeds.rb')].sort.each { |seed| load seed }


# User Types
# [
#   { name: 'Regular', description: 'Regular users' },
#   { name: 'Admin', description: 'Administrators' }
# ].each do |user_type|
#   UserType.find_or_create_by(name: user_type[:name], description: user_type[:description])
# end

