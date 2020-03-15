export const formatColour = (colour: string) => {
  if (colour[0] === '#') {
    return colour.substr(1);
  } else {
    return colour;
  }
};
