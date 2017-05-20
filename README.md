# sports-broadcast-store
Database + API for Sports Game Broadcasts

## Usage
`rake db:setup` to create database and run migrations/seeds. This will populate all of
the teams as well as their accompanying nicknames.

```Rails
NbcScraper.new.scrape_nba
NbcScraper.new.scrape_mlb
NbcScraper.new.scrape_nfl
```

###
All dates/times are in UTC

### Credits
- NBCSports.com - for game schedules/TV networks
