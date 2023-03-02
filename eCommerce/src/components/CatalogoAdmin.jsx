import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import CustomList from './CustomList'
import ModalCategoria from './ModalCategoria'
import ListaProdutosAdmin from './ListaProdutosAdmin'
import ModalVariacoes from './ModalVariacoes'
import ModalProduto from './ModalProduto'
import { useProductContext } from '../contexts/Product'

export default function CatalogoAdmin() {

    const {produtos, getProducts} = useProductContext()
    const [idProduto, setIdProduto] = useState(undefined)

    const [categorias, setCategorias] = useState(['Painéis de Led', 'Vasos', 'Castiçais', 'Bandejas'])
    const [variacoes, setVariacoes] = useState(['Tamanho', 'Cor'])
    const [variacoesVisible, setVariacoesVisible] = useState(false)
    
    const [modalCategoria ,setModalCategoria] = useState(false)
    const [modalVariacoes ,setModalVariacoes] = useState(false)
    const [modalProduto, setModalProduto] = useState(false);
    const [edit, setEdit] = useState(false)

    useEffect( () =>{
        getProducts()   
    }, [] )

  return (
    <section>
        
        {
            modalCategoria && <ModalCategoria setModalCategoria={setModalCategoria} edit={edit} placeh='Ex: Bandejas' />
        }      
        {
            modalVariacoes && <ModalVariacoes setModalVariacoes={setModalVariacoes} edit={edit} placeh1='Exemplo: "Cor"' placeh2={'Exemplo: "Azul", "Amarelo"'}/>
        }  
        {
            modalProduto && <ModalProduto categorias={categorias} setModalProduto={setModalProduto} edit={edit} idProduto = {idProduto}/>
        }  
        <input 
            type="text" 
            placeholder='Buscar produto'
            className='py-3 px-6 w-full rounded-md outline-none border mb-5 shadow-lg shadow-gray-200/50'
        />

        <CustomList setEdit={setEdit} title={'Categorias'} customs={categorias} setModalCustom={setModalCategoria}/>
        {
            variacoesVisible && 
            <CustomList setEdit={setEdit} title={'Variações'} customs={variacoes} setModalCustom={setModalVariacoes}/>
        }
        
        <p 
            className='text-blue-500 text-sm font-medium p-0.5 cursor-pointer -mt-3'
            onClick={() => setVariacoesVisible(!variacoesVisible)}
        >{`${variacoesVisible?'Menos':'Mais'} opções`}</p>

        <ListaProdutosAdmin setModalProduto={setModalProduto} produtos={produtos} setEdit={setEdit} setIdProduto={setIdProduto}/> 
    </section>
  )
}
