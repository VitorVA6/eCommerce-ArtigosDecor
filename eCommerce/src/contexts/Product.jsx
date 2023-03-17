import { createContext, useContext, useState } from "react";
import axios from 'axios'

export const ProductContext = createContext() 

export default function ProductProvider( {children} ){

    const [produtos, setProdutos] = useState([])
    const [page, setPage] = useState(1)
    const perPage = 5

    return (
        <ProductContext.Provider value={{produtos, setProdutos, page, setPage, perPage}}>
            {children}
        </ProductContext.Provider>
    )

}

export function useProductContext(){

    const { produtos, setProdutos, page, setPage, perPage} = useContext(ProductContext)

    async function addProduct(name, price, priceoff, category, desc, images){
        const formData = new FormData()

        formData.append('title', name)
        formData.append('preco', price)
        formData.append('desconto', priceoff)
        formData.append('categoria', category)
        formData.append('desc', desc)
        for(let i = 0; i < images.length ;i++){
            formData.append('images', images[i].file)
        }

        try{
            const {data} = await axios.post('/products/add', formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            getProducts(perPage*page, 1)
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    async function updateProduct(id, name, price, priceoff, category, desc, images, uploadedImages){
        const formData = new FormData()

        formData.append('title', name)
        formData.append('preco', price)
        formData.append('desconto', priceoff)
        formData.append('categoria', category)
        formData.append('desc', desc)
        formData.append('uploadedImages', uploadedImages)
        for(let i = 0; i < images.length ;i++){
            formData.append('images', images[i].file)
        }

        try{
            const {data} = await axios.patch(`/products/${id}`, formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            getProducts(perPage*page, 1)
            return data
        }
        catch(err){
            console.log(err.response.data)
        }
    }
    
    async function favoriteProduct(id, destaque){

        try{
            await axios.patch(`/products/favorite/${id}`, {destaque: !destaque})
            getProducts(perPage*page, 1)
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    async function filterProduct(key){

        try{
            const {data} = await axios.get('/products/filter', {params:{key: key}} )
            setProdutos(data)
        }catch(err){
            console.log(err)
        }

    }

    async function getProducts(limit, pag=undefined){

        try{
            const {data} = await axios.get('/products/all', {params:{p: pag?pag:page, limit: limit}})
            
            if((page === 1 && produtos.length > 0)|| limit>perPage){
                setProdutos([ ...data.docs])
                return data.hasNextPage
            }
            else if(produtos.length < data.totalDocs){
                setProdutos( prev => [...prev, ...data.docs])
                return data.hasNextPage
            }
            
        }
        catch(err){
            console.log(err)
        }

    }

    async function getProductById(id){

        try{
            const {data} = await axios.get(`/products/${id}`)
            return data
        }
        catch(err){
            console.log(err)
        }
    }

    async function deleteProduct(id){

        try{
            await axios.delete(`/products/${id}`)
            getProducts(perPage*page, 1)
        }
        catch(err){
            console.log(err)
        }

    }

    return {
        produtos,
        setProdutos,
        addProduct,
        getProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        favoriteProduct,
        filterProduct,
        page,
        setPage,
    }

}