export const formatColour = (colour: string) => {
  if (colour[0] === '#') {
    return colour.substr(1);
  } else {
    return colour;
  }
};

export const processRegExpPattern = (pattern: string) => {
  const matchDelimiters = pattern.match(/^\/(.*)\/(.*)$/);

  const [source ,flags] = (matchDelimiters || []).slice(1);
  
  return new RegExp(source || pattern, flags);
};

