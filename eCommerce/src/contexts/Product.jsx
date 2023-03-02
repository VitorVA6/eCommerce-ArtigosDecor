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

    async function addProduct(name, price, priceoff, category, desc, image){
        const formData = new FormData()

        formData.append('title', name)
        formData.append('preco', price)
        formData.append('desconto', priceoff)
        formData.append('categoria', category)
        formData.append('desc', desc)
        formData.append('image', image)

        try{
            const {data} = await axios.post('/products/add', formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            getProducts()
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    async function updateProduct(id, name, price, priceoff, category, desc, image){
        const formData = new FormData()

        formData.append('title', name)
        formData.append('preco', price)
        formData.append('desconto', priceoff)
        formData.append('categoria', category)
        formData.append('desc', desc)
        formData.append('image', image)

        try{
            const {data} = await axios.patch(`/products/${id}`, formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            getProducts()
            return data
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    async function getProducts(){

        try{
            const {data} = await axios.get('/products/all')
            console.log(data.products)
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

    return {
        produtos,
        setProdutos,
        addProduct,
        getProducts,
        getProductById,
        updateProduct
    }

}