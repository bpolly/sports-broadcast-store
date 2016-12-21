namespace :delete do
  desc 'Delete games older than yesterday'
  task :old_games => :environment do
    Game.where('date < ?', 1.days.ago).each do |game|
      game.destroy
    end
  end
end
