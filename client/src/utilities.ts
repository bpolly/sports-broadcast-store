export function titleCase(str: string): string {
  if (str.length === 0) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

export function generateTeamOptions(teams: Team[]): TeamSelectOption[] {
  return teams.map(function (team) {
    return {
      value: team.slug,
      label: titleCase(team.name),
      className: 'favorite-team-option',
    }
  })
}

// export function generatePhoneNumberOptions(phoneNumber) {
//   return phoneNumber.filter(phoneNumber => phoneNumber.verified).map(function(phoneNumber) {
//     let tmp = {}
//     tmp['value'] = phoneNumber.id
//     tmp['label'] = phoneNumber.number
//     return tmp;
//   });
// }

export function chunkArrayInGroups(arr: any[], size: number): any[] {
  const myArray: any[] = []
  for (let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size))
  }
  return myArray
}
