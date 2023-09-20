import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export default function UserProvider({children}){
    const [authenticated, setAuthenticated] = useState(false)
    const [email, setEmail] = useState('')

    return (
        <UserContext.Provider value = {{authenticated, setAuthenticated, email, setEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const {authenticated, setAuthenticated, email, setEmail} = useContext(UserContext)
    const navigate = useNavigate()

    async function login(email, password){
        const url = '/users/login'
        try{
            const {data} = await axios.post(url, {email, password})
            setAuthenticated(true)
            localStorage.setItem('token', data.token)
            setEmail(data.email)
        }      
        catch(err){
            if(!!err.response?.data){
                return err.response.data
            }
                return {error: 'O servidor está com problemas, tente novamente mais tarde.'}
        }               
    }

    function logout(){
        localStorage.removeItem('token')
        setEmail('')
        axios.defaults.headers.Authorization = undefined
        navigate('/login')
        setAuthenticated(false)
    }

    async function checkAuth(){
        const token = localStorage.getItem('token')
        if (!token) {
            setAuthenticated(false)
            return
        }
        axios.defaults.headers.Authorization = token
        setAuthenticated(true)
    }

    async function getUser(){
        try{
            const {data} = await axios.get('/users/getuser')
            setEmail(data.email)
        }catch(err){
            console.log(err)
        }
    }

    async function updateUser(user){
        try {
            const {data} = await axios.patch('/users/update', user)
            return data
        }
        catch(err){
           if(!!err.response?.data){
               return err.response.data
           }
            return {error: 'O servidor está com problemas, tente mais tarde.'}
        }
    }
    
    async function forgotPassword(email){
        try {
            const {data} = await axios.post('/users/send-email-recovery', {email})
            return data
        }
        catch(err){
            if(!!err.response?.data){
                return err.response.data
            }
            return {error: 'O servidor está com problemas, tente mais tarde.'}
        }
    }
    
    async function resetPassword(token, password){
        try {
            const {data} = await axios.patch(`/users/reset-password/${token}`, {password})
            return data
        }
        catch(err){
           if(!!err.response?.data){
               return err.response.data
           }
            return {error: 'O servidor está com problemas, tente mais tarde.'}
        }
    }

    return {
        authenticated,
        email, 
        setEmail,
        checkAuth,
        logout,
        getUser,
        updateUser,
        login,
        forgotPassword,
        resetPassword
    }
}