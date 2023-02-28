import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/User'
import {Navigate} from 'react-router-dom'

export default function Login() {

  const {login, authenticated, checkAuth} = useUserContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect( ()=>{

    checkAuth()

  }, [] )

  const handleSubmit = (event)=>{
    event.preventDefault()
    login(email, password)
    console.log(authenticated)
  }

  if (authenticated){
    return <Navigate to='/admin'/>
  }

  return (
    
    <section className='flex w-screen h-screen justify-center items-center'>
        <form 
          className='flex w-1/3 flex-col'
          onSubmit={handleSubmit}  
        >
            <h2 className='text-xl font-semibold text-center mb-6'>Entre na sua conta</h2>
            <div className='flex gap-2 mb-4 flex-col'>
                <h3 className='text-sm font-medium'>E-mail</h3>
                <input 
                  className='border-b outline-none focus:border-black py-1 text-sm' 
                  type="text" 
                  placeholder='Digite seu e-mail' 
                  onChange={(event) => {setEmail(event.target.value) }}
                />
            </div>            
            <div className='flex gap-2 mb-4 flex-col'>
                <h3 className='text-sm font-medium'>Login</h3>
                <input 
                  className='border-b outline-none focus:border-black py-1 text-sm' 
                  type="text" 
                  placeholder='Mínimo de 6 caracteres' 
                  onChange={(event) => {setPassword(event.target.value)}}  
                />
            </div>
            <button className='bg-blue-500 text-white w-full rounded-lg py-3 text-sm font-medium'>Entrar</button>
        </form>
    </section>
  )
}
