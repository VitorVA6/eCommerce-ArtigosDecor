import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export default function UserProvider({children}){
    const [authenticated, setAuthenticated] = useState(false)

    return (
        <UserContext.Provider value = {{authenticated, setAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const {authenticated, setAuthenticated} = useContext(UserContext)

    async function login(email, password){
        const url = '/users/login'
        try{
            const response = await axios.post(url, {email, password})
            setAuthenticated(true)
            localStorage.setItem('token', response.data.token)
            
        }catch(err){
            console.log(err.response.data)
        }
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

    return {
        authenticated,
        checkAuth,
        login
    }
}
