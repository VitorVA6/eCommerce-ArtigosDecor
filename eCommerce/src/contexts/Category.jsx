import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

export const CategoryContext = createContext()

export default function CategoryProvider({children}){

    const [categories, setCategories] = useState([])

    return (
        <CategoryContext.Provider value = {{categories, setCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategoryContext(){
    const {categories, setCategories} = useContext(CategoryContext)

    async function getCategories(){

        try{
            const {data} = await axios.get('/category/get-all')
            setCategories(data)
        }catch(err){
            console.log(err)
        }

    }
    async function getCategoriesById(id){

        try{
            const {data} = await axios.get(`/category/${id}`)
            return data
        }catch(err){
            console.log(err)
        }

    }
    
    async function addCategory(name, image){

        const formData = new FormData()

        formData.append('name', name)
        if(image.length === 1){
            formData.append('image', image[0].file)  
        }        

        try{
            const {data} = await axios.post('/category/add', formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            getCategories()
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }
    }

    async function updateCategory(id, name, image, uploadedImage){
        const formData = new FormData()

        formData.append('name', name)
        if(image.length === 1){
            formData.append('image', image[0].file)
        }        
        else{
            formData.append('uploadedImages', uploadedImage)
        }
        try{
            const {data} = await axios.patch(`/category/${id}`, formData,  {headers: {'Content-Type': 'multipart/form-data'}})
            getCategories()
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }

    }

    return {
        categories,
        setCategories,
        addCategory,
        getCategories,
        getCategoriesById,
        updateCategory
    }
}

