import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export default function UserProvider({children}){
    const [authenticated, setAuthenticated] = useState(false)
    const [email, setEmail] = useState('')

    return (
        <UserContext.Provider value = {{authenticated, setAuthenticated, setEmail, email}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const {authenticated, setAuthenticated, setEmail, email} = useContext(UserContext)
    const navigate = useNavigate()

    async function login(email, password){
        const url = '/users/login'
        try{
            const response = await axios.post(url, {email, password})
            setAuthenticated(true)
            localStorage.setItem('token', response.data.token)
            setEmail(response.data.email)
            
        }catch(err){
            console.log(err.response.data)
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
            console.log(data)
        }
        catch(err){
            console.log(err)
        }

    }

    return {
        authenticated,
        checkAuth,
        login,
        logout,
        email,
        setEmail,
        getUser,
        updateUser
    }
}
