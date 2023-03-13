import { createContext, useContext, useState } from "react";
import axios from 'axios'

export const ProductContext = createContext() 

export default function ProductProvider( {children} ){

    const [produtos, setProdutos] = useState([])

    return (
        <ProductContext.Provider value={{produtos, setProdutos}}>
            {children}
        </ProductContext.Provider>
    )

}

export function useProductContext(){

    const { produtos, setProdutos } = useContext(ProductContext)

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
            getProducts()
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
            getProducts()
            return data
        }
        catch(err){
            console.log(err.response.data)
        }
    }
    
    async function favoriteProduct(id, destaque){

        try{
            await axios.patch(`/products/favorite/${id}`, {destaque: !destaque})
            getProducts()
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

    async function getProducts(){

        try{
            const {data} = await axios.get('/products/all')
            setProdutos(data.products)
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
            getProducts()
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
        filterProduct
    }

}