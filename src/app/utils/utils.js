export const fixColor = (str) => {
  return str.replace(/[/#"]/g, '0x')
}

export const getNr2 = (u) => {
  if (u < 10) {
    return '00' + u
  }
  if (u < 100) {
    return '0' + u
  }
  return u
}

Object.size = function (obj) {
  var size = 0; var key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}
