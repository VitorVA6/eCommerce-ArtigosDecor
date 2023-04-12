import {useContext, createContext, useState} from 'react' 
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CatalogContext = createContext() 

export default function CatalogProvider({children}){

    const [catalog, setCatalog] = useState({
        sobre: '',
        telefone: '',
        rsociais: {insta: '', face: '', yt: '', tt: ''},
        nome: '',
        whats: '',
        email: '',
        bannerdt: []
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

    async function updateCatalog( uploadedImages = undefined, images = undefined ){

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
            const {data} = await axios.patch('/catalog/update', catalog)
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error:'Ocorreu um erro no servidor.'}
        }

    }

    const notifySucess = (alerta) => {
        toast.success(alerta, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            closeButton: false,
            pauseOnHover: false,
            theme: 'dark',
            className: 'mt-10'
        });
    };

    const notifyError = (alerta) => {
        toast.error(alerta, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            closeButton: false,
            pauseOnHover: false,
            theme: 'dark',
            className: 'mt-10'
        });
    };

    return {
        catalog,
        setCatalog,
        getCatalog,
        updateCatalog,
        notifySucess,
        notifyError,
        ToastContainer
    }

}