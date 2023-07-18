import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import {loginSchema} from '../schemas'

export const UserContext = createContext()

export default function UserProvider({children}){
    const [authenticated, setAuthenticated] = useState(false)
    const [email, setEmail] = useState('')
    const loginForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            const url = '/users/login'            
            axios.post(url, values).then(response => {
                setAuthenticated(true)
                localStorage.setItem('token', response.data.token)
                setEmail(response.data.email)
            })
            .catch(err => console.log(err.response.data))                
        }
    })

    return (
        <UserContext.Provider value = {{authenticated, setAuthenticated, loginForm, email, setEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const {authenticated, setAuthenticated, loginForm, email, setEmail} = useContext(UserContext)
    const navigate = useNavigate()

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

    return {
        authenticated,
        loginForm,
        email, 
        setEmail,
        checkAuth,
        logout,
        getUser,
        updateUser
    }
}
