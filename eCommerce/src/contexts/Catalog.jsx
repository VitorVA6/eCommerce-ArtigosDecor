import {useContext, createContext, useState} from 'react' 
import axios from 'axios'

export const CatalogContext = createContext() 

export default function CatalogProvider({children}){

    const [catalog, setCatalog] = useState({
        sobre: '',
        telefone: '',
        rsociais: {insta: '', face: '', yt: '', tt: ''},
        nome: '',
        whats: '',
        email: '',
        categorias: [],
        variacoes: []
    })

    return (
        <CatalogContext.Provider value={{catalog, setCatalog}}>
            {children}
        </CatalogContext.Provider>
    )

}

export function useCatalogContext(){

    const {catalog, setCatalog} = useContext(CatalogContext)

    async function getCatalog(){
        try{
            const {data} = await axios.get('/catalog/settings')
            setCatalog(data) 
        }
        catch(err){
            console.log(err)
        }
        
    }

    async function updateCatalog( categorias=undefined ){

        try{
            if(categorias !== undefined){
                const {data} = await axios.patch('/catalog/update', categorias)
                return data
            }
            const {data} = await axios.patch('/catalog/update', catalog)
            return data
        }
        catch(err){
            return err
        }

    }

    return {
        catalog,
        setCatalog,
        getCatalog,
        updateCatalog
    }

}