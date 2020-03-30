export const formatColour = (colour: string) => {
  if (colour[0] === '#') {
    return colour.substr(1);
  } else {
    return colour;
  }
};

export const processRegExpPattern = (pattern: string) => {
  const matchDelimiters = pattern.match(/^\/(.*)\/(.*)$/);

  const regexp = (matchDelimiters || []).slice(1);
  const flags = regexp.pop();
  const source = regexp.join('');

  return flags
    ? RegExp.apply(RegExp, [source, flags])
    : new RegExp(pattern);
};
