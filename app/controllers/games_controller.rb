class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def scrape
    # scraper = Scraper.new("mlb", "baseball")
    # scraper.scrape
  end # do_scraping


end
