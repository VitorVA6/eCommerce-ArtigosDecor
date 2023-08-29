function inverseCurrency(value){
    if(typeof(value) === 'string'){
        let stringValue = value.replace(/,/, '.').replace(/./, '').replace(/[\D]/g, '')
        return stringValue/100
    }
    return value
}

export {
    inverseCurrency,
}