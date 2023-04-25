import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

export const VariationContext = createContext()

export default function VariationProvider({children}){

    const [variations, setVariations] = useState([])

    return (
        <VariationContext.Provider value = {{variations, setVariations}}>
            {children}
        </VariationContext.Provider>
    )
}

export function useVariationContext(){
    const {variations, setVariations} = useContext(VariationContext)

    async function getVariations(){

        try{
            const {data} = await axios.get('/variation/get-all')
            setVariations(data)
        }catch(err){
            console.log(err)
        }

    }
    async function getVariationById(id){

        try{
            const {data} = await axios.get(`/variation/${id}`)
            return data
        }catch(err){
            console.log(err)
        }

    }

    async function removeVariation(id){

        try{
            const {data} = await axios.delete(`/variation/${id}`)
            getVariations()
            return data
        }catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }

    }

    async function removeOption(idVar, idOption){

        try{
            const {data} = await axios.put(`/variation/${idVar}`, {idOption: idOption})
            return data
        }catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }

    }
    
    async function addVariation(name, options){      

        try{
            const {data} = await axios.post('/variation/add', {name, options})
            getVariations()
            return data
        }
        catch(err){
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }
    }

    async function updateVariation(id, name, options){
        
        try{
            const {data} = await axios.patch(`/variation/${id}`, {name, options})
            getVariations()
            return data
        }
        catch(err){
            console.log(err)
            return err.response ? err.response.data : {error: 'Ocorreu um erro no servidor!'}
        }

    }

    return {
        variations,
        setVariations,
        addVariation,
        getVariations,
        getVariationById,
        updateVariation,
        removeVariation,
        removeOption
    }
}