export const getInitialsFromName = (name: string, noSpace: boolean = false, excludeMiddleName: boolean = false): string => {
  const nameParts = name?.split(' ');
  if (nameParts) {
    let initials;
    if (excludeMiddleName && nameParts?.length > 2) {
      initials = [nameParts[0], nameParts[nameParts.length - 1]].map(part => part.charAt(0).toUpperCase());
    } else {
      initials = nameParts?.map(part => part.charAt(0).toUpperCase());
    }
    return initials?.join(noSpace ? '' : ' ');
  } else return '';
};

export const stringToColor = (name: string) => {
  const letter = (name || 'A').trim().toUpperCase().charAt(0);
  const colors = [
    '#FF7272',
    '#FF965B',
    '#FFB84D',
    '#7BC862',
    '#4ECDC4',
    '#5B9FFF',
    '#7A7AFF',
    '#B47AFF',
    '#FF7AAA',
    '#FF6B6B',
    '#63C7FF',
    '#59E1A1',
    '#FF8F59',
    '#5CE1E6',
    '#FF96B7',
    '#8AC926',
    '#6B76FF',
    '#FF8243',
    '#4CB944',
    '#5D5FEF',
    '#FF6B8B',
    '#47C1BF',
    '#FF9966',
    '#6F8EE8',
    '#FF7DA3',
    '#4EC5BB',
  ];
  const index = letter.charCodeAt(0) - 65;
  return colors[Math.abs(index) % colors.length];
};
