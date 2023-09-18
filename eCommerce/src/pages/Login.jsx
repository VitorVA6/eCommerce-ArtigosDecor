import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/User'
import {Link, Navigate} from 'react-router-dom'
import loginSVG from '../images/login-img.svg'
import {AiFillCheckCircle} from 'react-icons/ai'
import {BsCircle} from 'react-icons/bs'
import { useFormik } from 'formik'
import notifies from '../utils/toastNotifies'
import {loginSchema} from '../schemas'

export default function Login() {
  const {authenticated, checkAuth, login} = useUserContext()
  const [remember, setRemember] = useState(false)
  const loginForm = useFormik({
    enableReinitialize: true,
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: loginSchema,
    onSubmit: values => {
        login(values.email, values.password)
        .then(data => {
          if(!!data?.error){
            notifies.error(data.error)
          }
        })
    }
  })

  useEffect( ()=>{
    checkAuth()
  }, [] )

  if (authenticated){
    return <Navigate to='/admin'/>
  }

  return (
    <>
      <notifies.Container />
      <section className='flex flex-col lg:grid lg:grid-cols-2 w-screen h-screen text-black/80'>
          <div className='lg:flex justify-center items-center h-[30vh] md:h-[40vh] lg:h-full bg-gray-100 px-6'>
            <img src={loginSVG} className='h-full' alt="Imagem de um administrador" />
          </div>
          <div className='flex flex-col h-full pl-12 pr-12 md:pl-20 xl:pl-24 md:pr-24 xl:pr-36 pt-10 md:pt-12 lg:pt-20 xl:pt-28'>
            <h1 className='text-3xl md:text-[40px] font-black'>Seja Bem-vindo</h1>
            <h2 className='text-sm md:text-lg lg:text-base text-gray-400 md:mt-2 lg:mt-3 mb-6 xl:mb-6'>Faça login para gerenciar sua loja</h2>
            <form 
              className='flex flex-col gap-2'
              onSubmit={loginForm.handleSubmit}
            >
              <div className='flex flex-col gap-1 mb-2'>
                <h3 className='text-sm md:text-lg lg:text-base xl:text-lg font-medium'>Usuário</h3>
                <input 
                  id='email'
                  type="text" 
                  placeholder='Seu e-mail'
                  className='text-sm md:text-lg lg:text-base px-3 py-2 rounded-lg border-[2px] border-gray-300'
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                {
                  loginForm.touched.email && loginForm.errors.email && <p className='text-red-500 text-xs'>{`${loginForm.errors.email}`}</p>
                }
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className='text-sm md:text-lg lg:text-base xl:text-lg font-medium'>Senha</h3>
                <input 
                  id='password'
                  type="password" 
                  placeholder='Sua senha'
                  className='text-sm md:text-lg lg:text-base px-3 py-2 rounded-lg border-[2px] border-gray-300'
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                {
                  loginForm.touched.password && loginForm.errors.password && <p className='text-red-500 text-xs'>{`${loginForm.errors.password}`}</p>
                }
              </div>
              <button 
                className='text-gray-400 text-[13px] md:text-base lg:text-sm mt-2 w-fit flex items-center gap-1'
                onClick={(ev) => {
                  ev.preventDefault()
                  setRemember(!remember)
                }}
              >
                {
                remember ?
                <AiFillCheckCircle className='text-green-400 -mt-0.5 md:mt-0 w-3.5 h-3.5 md:w-4 md:h-4' /> : <BsCircle className='-mt-0.5 md:mt-0 w-3.5 h-3.5 md:w-4 md:h-4'/>
                }
                Lembrar-me
              </button>
              <Link className='text-gray-400 text-[13px] md:text-base lg:text-sm w-fit -mt-1'>Esqueceu sua senha?</Link>
              <button type='submit' className='text-sm md:text-base w-fit py-2.5 px-24 mt-5 text-white bg-color-secundary rounded-full font-medium'>Login</button>
            </form>
          </div>
      </section>
    </>
  )
}