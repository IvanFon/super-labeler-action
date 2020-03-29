export const nameToId = (name: string) =>
  name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^0-9a-z-]/gi, '');
