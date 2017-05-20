desc "Deletes any games older than today and scrapes for new ones"
task scrape_new: [:environment] do
  Game.where("date < ?", Date.today).destroy_all
  scraper = NbcScraper.new
  scraper.scrape_nba
  scraper.scrape_mlb
end
