class WebGameSerializer < ActiveModel::Serializer
  attributes :id, :date, :tv_networks, :league, :home_team, :away_team,

  def home_team
    object.home_team.slice(:name, :slug)
  end

  def away_team
    object.away_team.slice(:name, :slug)
  end

  def tv_networks
    humanized_networks = []
    object.tv_networks.split(",").map(&:strip).map(&:upcase).each do |network|
      humanized_networks << (HumanizedNetworkFinder.for(network) || network)
    end
    humanized_networks.to_sentence.tr('.', '')
  end

  def date
    user_gmt_offset = @instance_options[:user_gmt_offset]
    user_gmt_offset ||= UserZipCode.default_offset
    object.date.utc + user_gmt_offset.hours
  end
end
