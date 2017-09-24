desc "Deletes any games older than today and scrapes for new ones"
task scrape_new: [:environment] do
  Rake::Task["delete:old_games"].invoke
  NbcScraper.new.scrape_mlb
  NbcScraper.new.scrape_nfl
  NbcScraper.new.scrape_nba
end
