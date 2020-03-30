export const nameToId = (index: number, name: string) =>
  `${index}-${name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^0-9a-z-]/gi, '')}`;
