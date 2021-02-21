# sports-broadcast-store
Database + API for Sports Game Broadcasts

## Usage
The app is setup to run via Docker-Compose. To get your environment running:
```
docker-compose up -d
docker-compose run backend rails db:setup
```

```Rails
# to scrape for new games
NbcScraper.new.scrape_nba
NbcScraper.new.scrape_mlb
NbcScraper.new.scrape_nfl
```

###
All dates/times are in UTC

### Credits
- NBCSports.com - for game schedules/TV networks
