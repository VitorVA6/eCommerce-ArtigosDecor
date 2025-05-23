import { createContext, useContext, useState } from "react";
import axios from 'axios'
import {inverseCurrency} from '../utils/currency'

export const ProductContext = createContext() 

export default function ProductProvider( {children} ){
    const [produtos, setProdutos] = useState([])
    const perPage = 8
    const [selCategory, setSelCategory] = useState('')

    return (
        <ProductContext.Provider value={{produtos, setProdutos, perPage, selCategory, setSelCategory}}>
            {children}
        </ProductContext.Provider>
    )

}

export function useProductContext(){
    const { produtos, setProdutos, perPage, selCategory, setSelCategory} = useContext(ProductContext)


    async function addProductByFile(products){
        try{
            const {data} = await axios.post(`/products/upload-link`, {products})
            return data
        }catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }
    }

    async function addProduct(name, price, priceoff, category, desc, images, combinations, variations){
        const formData = new FormData()
        formData.append('title', name)
        formData.append('preco', price)
        formData.append('desconto', priceoff)
        formData.append('categoria', JSON.stringify(category))
        formData.append('desc', desc)
        formData.append('combinations', JSON.stringify(combinations))
        formData.append('variations', JSON.stringify(variations))

        for(let i = 0; i < images.length ;i++){
            formData.append('images', images[i].file)
        }

        try{
            const {data} = await axios.post('/products/add', formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            const limit = Math.ceil(produtos.length/perPage)*perPage
            getProducts(limit, 1, 'all', 'false')
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }
    }

    async function updateProduct(id, name, price, priceoff, category, desc, images, uploadedImages, combinations, variations){
        const formData = new FormData()
        formData.append('title', name)
        formData.append('preco', price)
        formData.append('desconto', priceoff)
        formData.append('categoria', JSON.stringify(category))
        formData.append('desc', desc)
        formData.append('combinations', JSON.stringify(combinations))
        formData.append('variations', JSON.stringify(variations))
        formData.append('uploadedImages', uploadedImages)

        for(let i = 0; i < images.length ;i++){
            formData.append('images', images[i].file)
        }
        console.log(formData)

        try{
            const {data} = await axios.patch(`/products/${id}`, formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            const limit = Math.ceil(produtos.length/perPage)*perPage
            getProducts(limit, 1, 'all', 'false')
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }
    }
    
    async function favoriteProduct(id, destaque){
        try{
            await axios.patch(`/products/favorite/${id}`, {destaque: !destaque})
            const limit = Math.ceil(produtos.length/perPage)*perPage
            getProducts(limit, 1, 'all', 'false')
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

    async function getProducts(limit, pag, category, ordination, key){    
        try{
            const {data} = await axios.get('/products/all', {params:
                {
                    p: pag, 
                    limit: limit,
                    category: category,
                    ordination: ordination,
                    key: !!key ? key : ''
                }
            })          
            if((produtos.length > 0 && pag === 1)|| limit>perPage){
                setProdutos([ ...data.docs])
                return data
            }
            else if(produtos.length < data.totalDocs){
                setProdutos( prev => [...prev, ...data.docs])
                return data
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
            return {}
        }
    }

    async function deleteProduct(id){
        try{
            await axios.delete(`/products/${id}`)
            const limit = Math.ceil(produtos.length/perPage)*perPage
            getProducts(limit, 1, 'all', 'false')
        }
        catch(err){
            console.log(err)
        }
    }

    function currencyToNumber(elements){
        let aux = elements.map(el => {
            return {
                ...el,
                price: inverseCurrency(el.price),
                priceoff: inverseCurrency(el.priceoff)
            }
        })
        return aux
    }
    
    function numberToCurrency(elements){
        let aux = elements.map(el => {
            return {
                ...el,
                price: parseFloat(el.price.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                priceoff: parseFloat(el.priceoff.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
        })
        return aux
    }

    return {
        produtos,
        setProdutos,
        perPage,
        selCategory,
        setSelCategory,
        addProductByFile,
        addProduct,
        getProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        favoriteProduct,
        filterProduct,
        currencyToNumber,
        numberToCurrency
    }

}