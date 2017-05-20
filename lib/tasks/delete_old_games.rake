namespace :delete do
  desc 'Delete games older than yesterday'
  task :old_games => :environment do
    Game.where("date < ?", Date.today).destroy_all
  end

  desc 'Delete all games'
  task :all_games => :environment do
    Game.destroy_all
  end
end
