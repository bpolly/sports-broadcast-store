[
  { name: 'Regular', description: 'Regular users' },
  { name: 'Admin', description: 'Administrators' }
].each do |user_type|
  UserType.find_or_create_by(name: user_type[:name], description: user_type[:description])
end