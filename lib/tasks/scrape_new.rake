desc "Deletes any games older than today and scrapes for new ones"
task scrape_new: [:environment] do
  Rake::Task["delete:old_games"].invoke
  scraper = NbcScraper.new
  scraper.scrape_nba
  scraper.scrape_mlb
end
