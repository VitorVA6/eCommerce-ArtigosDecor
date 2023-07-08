export default function checkComplete(errors, values){
    if(Object.keys(errors).length !== 0){
      return false
    }

    for (let chave in values) {
      if (values.hasOwnProperty(chave)) {
        if(chave === 'complemento'){
            continue
        }
        if (values[chave].trim() === '') {
          return false;
        }
      }
    }
    return true
  }