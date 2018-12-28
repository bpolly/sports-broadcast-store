class HumanizedNetworkFinder
  def self.for(network)
    network_list[network]
  end

  def self.network_list
    JSON.parse(File.read('lib/networkList.json'))
  end
end
