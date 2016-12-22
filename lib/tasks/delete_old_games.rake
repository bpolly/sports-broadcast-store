namespace :delete do
  desc 'Delete games older than yesterday'
  task :old_games => :environment do
    Game.delete_all('date < ?', 1.days.ago)
  end
end
