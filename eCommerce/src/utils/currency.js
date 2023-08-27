function inverseCurrency(value){
    let stringValue = value.replace(/,/, '.').replace(/./, '').replace(/[\D]/g, '')
    return stringValue/100
}

export {
    inverseCurrency,
}