const masks = {
    maskWhats: (value)=>{
        return value.replace(/[\D]/g, '')
        .replace(/(\d{1})/, '($1')
        .replace(/(\d{2})(\d)/, '$1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1');
    }, 
    maskCPF: (value) => {
        return value.replace(/[\D]/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})(\d+?)/, '$1')
    },
    maskCEP: (value) => {
        return value.replace(/[\D]/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})(\d+?)/, '$1')
    },
    maskCurrency: (value) => {
        value = value.replace(/[\D]/g, '')
        value = parseFloat((value/100).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        return value
    }
}

export default masks