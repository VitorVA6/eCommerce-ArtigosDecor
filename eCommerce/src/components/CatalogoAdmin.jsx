import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import CustomList from './CustomList'
import ModalCategoria from './ModalCategoria'
import ListaProdutosAdmin from './ListaProdutosAdmin'
import ModalVariacoes from './ModalVariacoes'
import ModalProduto from './ModalProduto'
import { useProductContext } from '../contexts/Product'
import { useCatalogContext } from '../contexts/Catalog'

export default function CatalogoAdmin() {

    const {catalog, getCatalog} = useCatalogContext()
    const {produtos, getProducts, filterProduct, page, setPage} = useProductContext()

    const [idProduto, setIdProduto] = useState(undefined)
    const [idCustom, setIdCustom] = useState(undefined)

    const [variacoesVisible, setVariacoesVisible] = useState(false)
    
    const [modalCategoria ,setModalCategoria] = useState(false)
    const [modalVariacoes ,setModalVariacoes] = useState(false)
    const [modalProduto, setModalProduto] = useState(false);
    const [edit, setEdit] = useState(false)
    const [filter, setFilter] = useState('')

    const [next, setNext] = useState(false)

    useEffect( () => {

        getCatalog()
        setPage(1)

    }, [] )

    useEffect( () =>{

        getProducts(5)
        .then( next => {
            setNext(next)
        })
        .catch(err => console.log(err))

    }, [page] )

    useEffect( ()=>{

        const handleScroll = (ev) => {
        
            const scrollHeight = ev.target.scrollHeight
            const currentHeight = ev.target.scrollTop + window.innerHeight

            if(currentHeight + 1 >= scrollHeight){

                setPage(page+1*next)

            }
    
        }

        window.addEventListener('scroll', handleScroll, true)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [page, next] )

    

    function handleFilter(ev){
        let filt = ev.target.value
        setFilter(filt)
        if(filt.length > 0){
            filterProduct(filt)
        }
        else{
            getProducts()
        }
    }

  return (
    <section>
        
        {
            modalCategoria && <ModalCategoria setModalCategoria={setModalCategoria} edit={edit} placeh='Ex: Bandejas' idCustom={idCustom} />
        }      
        {
            modalVariacoes && <ModalVariacoes setModalVariacoes={setModalVariacoes} edit={edit} placeh1='Exemplo: "Cor"' placeh2={'Exemplo: "Azul", "Amarelo"'} idCustom={idCustom}/>
        }  
        {
            modalProduto && <ModalProduto categorias={catalog.categorias} setModalProduto={setModalProduto} edit={edit} idProduto = {idProduto}/>
        }  
        <input 
            type="text" 
            placeholder='Buscar produto'
            className='py-3 px-6 w-full rounded-md outline-none border mb-5 shadow-lg shadow-gray-200/50'
            value={filter}
            onChange={(ev) => {handleFilter(ev)} }
        />

        <CustomList setEdit={setEdit} title={'Categorias'} customs={catalog.categorias} setModalCustom={setModalCategoria} setIdCustom={setIdCustom}/>
        {
            variacoesVisible && 
            <CustomList setEdit={setEdit} title={'Variações'} customs={catalog.variacoes} setModalCustom={setModalVariacoes} setIdCustom={setIdCustom}/>
        }
        
        <p 
            className='text-blue-500 text-sm font-medium p-0.5 cursor-pointer -mt-3'
            onClick={() => setVariacoesVisible(!variacoesVisible)}
        >{`${variacoesVisible?'Menos':'Mais'} opções`}</p>

        <ListaProdutosAdmin setModalProduto={setModalProduto} produtos={produtos} setEdit={setEdit} setIdProduto={setIdProduto}/> 
    </section>
  )
}
