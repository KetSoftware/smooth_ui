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

/** Avatar background colors — keep in sync with smoothhiring_ats/src/shared/utils.ts */
export const stringToColor = (name: string) => {
  const letter = (name || 'A').trim().toUpperCase().charAt(0);

  const colors = [
    '#FF7272', // A - Coral Red
    '#FF965B', // B - Warm Orange
    '#FFB84D', // C - Golden Yellow
    '#7BC862', // D - Fresh Green
    '#4ECDC4', // E - Turquoise
    '#5B9FFF', // F - Sky Blue
    '#7A7AFF', // G - Indigo
    '#B47AFF', // H - Purple
    '#FF7AAA', // I - Pink
    '#FF6B6B', // J - Salmon
    '#63C7FF', // K - Light Blue
    '#59E1A1', // L - Mint
    '#FF8F59', // M - Peach
    '#5CE1E6', // N - Azure
    '#FF96B7', // O - Rose
    '#8AC926', // P - Lime
    '#6B76FF', // Q - Royal Blue
    '#FF8243', // R - Tangerine
    '#4CB944', // S - Emerald
    '#5D5FEF', // T - Periwinkle
    '#FF6B8B', // U - Watermelon
    '#47C1BF', // V - Teal
    '#FF9966', // W - Apricot
    '#6F8EE8', // X - Cornflower
    '#FF7DA3', // Y - Strawberry
    '#4EC5BB', // Z - Sea Green
  ];

  const index = letter.charCodeAt(0) - 65;
  return colors[Math.abs(index) % colors.length];
};
