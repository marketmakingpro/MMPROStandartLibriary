function kebabize(str: string) {
  return str.split('').map(function (letter, idx) {
    return letter.toUpperCase() === letter ? "".concat(idx !== 0 ? '-' : '').concat(letter.toLowerCase()) : letter;
  }).join('');
}

function ifExists(name: string | string[]){
  let arrayOfKeys: string[] = []

  const func = (props: any) => {
    if(!Array.isArray(name)){
      if(name === 'all'){
        arrayOfKeys = Object.keys(props)
      } else {
        arrayOfKeys = [name]
      }
    }

    let stylesString = ``
    arrayOfKeys.forEach(key => {
      stylesString += `${props[key] ? `${kebabize(key)}: ${props[key]};`: ''}\n`
    })
    return stylesString
  }
  return func
}

export default ifExists
