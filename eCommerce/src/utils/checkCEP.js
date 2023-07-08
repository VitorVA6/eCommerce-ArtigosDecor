import axios from "axios"

export default async function checkCEP(cep){
    if(cep.length === 9){
        const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)      
        if(!!data.erro){  
            return {status:false, errorAPI: 'CEP inválido'}
        }else{
            return {status: true, info: data}
        }       
      }
    else{
        return {status:false, errorAPI: ''}
    }
}