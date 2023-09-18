import React, { useState } from 'react'
import { useEffect } from 'react'
import CustomList from './CustomList'
import ModalCategoria from './ModalCategoria'
import ListaProdutosAdmin from './ListaProdutosAdmin'
import ModalVariacoes from './ModalVariacoes'
import ModalProduto from './ModalProduto'
import { useProductContext } from '../contexts/Product'
import {useCategoryContext} from '../contexts/Category'
import {useVariationContext} from '../contexts/Variation'
import notifies from '../utils/toastNotifies'

export default function CatalogoAdmin() {

    const {produtos, getProducts, perPage} = useProductContext()
    const { getCategories, categories } = useCategoryContext()
    const { getVariations, variations } = useVariationContext()

    const [idProduto, setIdProduto] = useState(undefined)
    const [idCustom, setIdCustom] = useState(undefined)

    const [variacoesVisible, setVariacoesVisible] = useState(false)
    
    const [modalCategoria ,setModalCategoria] = useState(false)
    const [modalVariacoes ,setModalVariacoes] = useState(false)
    const [modalProduto, setModalProduto] = useState(false);
    const [edit, setEdit] = useState(false)
    const [filter, setFilter] = useState('')

    const [hasNext, setHasNext] = useState(false)
    const [nextPage, setNextPage] = useState(1)

    useEffect(()=>{
        getCategories()
        getVariations()
    }, [])

    useEffect( () => {
        getProducts(perPage, 1, 'all', 'false', filter)
        .then( data => {
            setHasNext(data?.hasNextPage)
            setNextPage(data?.nextPage)
        })
        .catch(err => console.log(err))
    }, [filter] )

  return (
    <section className=' overflow-hidden'>
        <notifies.Container />
        {
            modalCategoria && 
            <ModalCategoria 
                notifySucess = {notifies.sucess} 
                notifyError = {notifies.error} 
                setModalCategoria={setModalCategoria} 
                edit={edit} 
                placeh='Ex: Bandejas' 
                idCustom={idCustom}
            />
        }      
        {
            modalVariacoes && 
            <ModalVariacoes
                notifySucess = {notifies.sucess} 
                notifyError = {notifies.error} 
                setModalVariacoes={setModalVariacoes} 
                edit={edit} 
                placeh1='Exemplo: "Cor"' 
                placeh2={'Exemplo: "Azul", "Amarelo"'} 
                idCustom={idCustom}
            />
        }  
        {
            modalProduto && 
            <ModalProduto 
                notifySucess = {notifies.sucess} 
                notifyError = {notifies.error} 
                categorias={categories} 
                setModalProduto={setModalProduto} 
                edit={edit} 
                idProduto = {idProduto}
            />
        }  
        <input 
            type="text" 
            placeholder='Buscar produto'
            className='py-2.5 px-6 w-full rounded-md outline-none border mb-5 shadow-lg shadow-gray-200/50 text-sm lg:text-base lg:py-3'
            value={filter}
            onChange={(ev) => setFilter(ev.target.value) }
        />

        <CustomList setEdit={setEdit} title={'Categorias'} customs={categories} setModalCustom={setModalCategoria} setIdCustom={setIdCustom}/>
        {
            variacoesVisible && 
            <CustomList setEdit={setEdit} title={'Variações'} customs={variations} setModalCustom={setModalVariacoes} setIdCustom={setIdCustom}/>
        }
        
        <p 
            className='text-color-primary text-xs lg:text-sm font-medium p-0.5 cursor-pointer -mt-2 lg:-mt-3 text-center lg:text-left'
            onClick={() => setVariacoesVisible(!variacoesVisible)}
        >{`${variacoesVisible?'Menos':'Mais'} opções`}</p>

        <ListaProdutosAdmin setModalProduto={setModalProduto} produtos={produtos} setEdit={setEdit} setIdProduto={setIdProduto}/> 
        {
            hasNext &&
            <div className='flex w-full justify-center'>
                <button 
                  className='bg-color-primary py-3 w-1/2 text-white font-medium rounded-lg text-sm mb-20'
                  onClick = {()=> {
                    getProducts(perPage, nextPage, 'all', 'false', filter)
                    .then( data => {
                      setHasNext(data.hasNextPage)
                      setNextPage(data.nextPage)
                    })
                    .catch(err => console.log(err))
                  }}
                >Mostrar mais</button>
            </div>
          } 
    </section>
  )
}