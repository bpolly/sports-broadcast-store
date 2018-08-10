export function titleCase(str) {
  return str.toLowerCase().split(' ').map(word=>word[0].toUpperCase()+word.slice(1)).join(' ');
}

export function generateTeamOptions(teams) {
  return teams.map(function(team) {
    let tmp = {}
    tmp['value'] = team.slug;
    tmp['label'] = titleCase(team.name);
    tmp['className'] = 'favorite-team-option'
    return tmp;
  });
}

export function generatePhoneNumberOptions(phoneNumbers) {
  return phoneNumbers.filter(phoneNumber => phoneNumber.verified).map(function(phoneNumber) {
    let tmp = {}
    tmp['value'] = phoneNumber.id
    tmp['label'] = phoneNumber.number
    return tmp;
  });
}
