import {useContext, createContext, useState} from 'react' 
import axios from 'axios'
import { inverseCurrency } from '../utils/currency'

export const CatalogContext = createContext() 

export default function CatalogProvider({children}){

    const [catalog, setCatalog] = useState({
        sobre: '',
        telefone: '',
        rsociais: {insta: '', face: '', yt: '', tt: ''},
        nome: '',
        whats: '',
        email: '',
        bannerdt: [],
        address: {
            cep: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            complemento: ''
        },
        ship_option: 'BOTH',
        shipFree: {
            status: false,
            minValue: 0,
            validLocals: 'CITY'
        }
    })
    const shipOptions = {
        pickup: 'PICKUP',
        delivery: 'DELIVERY',
        both: 'BOTH'
    }
    const [loading, setLoading] = useState(false)

    const baseURL = 'http://[::1]:4000'

    return (
        <CatalogContext.Provider value={{catalog, setCatalog, baseURL, loading, setLoading, shipOptions}}>
            {children}
        </CatalogContext.Provider>
    )

}

export function useCatalogContext(){

    const {catalog, setCatalog, loading, setLoading, shipOptions} = useContext(CatalogContext)

    async function getCatalog(){
        try{
            setLoading(true)
            const {data} = await axios.get('/catalog/settings')
            setLoading(false)
            setCatalog(data) 
        }
        catch(err){
            setLoading(false)
            console.log(err)
        }
        
    }

    async function updateCatalog( uploadedImages = undefined, images = undefined, address = undefined ){
        try{
            if(uploadedImages !== undefined && images !== undefined){

                const formData = new FormData()

                formData.append('nome', catalog.nome)
                formData.append('whats', catalog.whats)
                formData.append('uploadedImages', uploadedImages)
                for(let i = 0; i < images.length; i++){
                    formData.append('images', images[i].file)
                }

                const {data} = await axios.patch('/catalog/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                return data
            }
            else if (address !== undefined){
                const {data} = await axios.patch('/catalog/update', {...catalog, address})
                 return data    
            }
            const {data} = await axios.patch(
                '/catalog/update', 
                {...catalog, shipFree: {...catalog.shipFree, minValue: inverseCurrency(catalog.shipFree.minValue)}})
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error:'Ocorreu um erro no servidor.'}
        }

    }

    return {
        catalog,
        setCatalog,
        loading,
        shipOptions,
        getCatalog,
        updateCatalog,
    }

}