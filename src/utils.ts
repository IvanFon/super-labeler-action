export const formatColor = (color: string) => {
  if (color.charAt(0) === '#') {
    return color.substr(1)
  } else {
    return color
  }
}

export const processRegExpPattern = (pattern: string) => {
  const matchDelimiters = pattern.match(/^\/(.*)\/(.*)$/)

  const [, source, flags] = matchDelimiters || []

  return new RegExp(source || pattern, flags)
}

export const normalize = (text: string) => (text || '').toUpperCase()
