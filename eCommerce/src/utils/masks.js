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
    }
}

export default masks