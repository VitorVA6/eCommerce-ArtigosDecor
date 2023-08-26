function inverseCurrency(value){
    let stringValue = value.replace(/,/, '.').replace(/./, '').replace(/[\D]/g, '')
    return stringValue/100
}

function currencyToNumber(elements){
    let aux = elements.map(el => {
        return {
            ...el,
            price: inverseCurrency(el.price),
            priceoff: inverseCurrency(el.priceoff)
        }
    })
    return aux
}

function numberToCurrency(elements){
    let aux = elements.map(el => {
        return {
            ...el,
            price: parseFloat(el.price.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            priceoff: parseFloat(el.priceoff.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
    })
    return aux
}

export {
    inverseCurrency,
    currencyToNumber,
    numberToCurrency
}