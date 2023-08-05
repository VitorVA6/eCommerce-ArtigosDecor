import React, { useEffect, useState } from 'react'
import { FiLogOut } from "react-icons/fi";
import { useUserContext } from '../contexts/User';
import {useFormik} from 'formik'
import { emailSchema, passwordSchema } from '../schemas';
import loadImg from '../images/load-icon.png'
import { useCatalogContext } from '../contexts/Catalog';
import notifies from '../utils/toastNotifies';

export default function ContaAdmin() {
  const { email, logout, getUser, updateUser } = useUserContext()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const {ToastContainer, notifyError, notifySucess} = useCatalogContext()
  const formikEmail = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email
    },
    validationSchema: emailSchema,
    onSubmit: values =>{
      setLoading(true)
      setMessage('')
      updateUser({email: values.email})
      .then(data => {
        setLoading(false)
        setMessage(data)
      })
    }
  })
  const formikPw = useFormik({
    initialValues:{
      password: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: passwordSchema,
    onSubmit: (values, {setValues, setTouched}) => {
      updateUser({senhaAtual: values.password, novaSenha: values.newPassword})
      .then(data => {
        if(!!data?.message){
          notifies.sucess(data.message)
          setValues({password: '', newPassword: '', confirmPassword: ''})
          setTouched({}, false)
        }else{
          notifies.error(data.error)
        }
      })
    }
  })

  useEffect( () => {
    getUser()
  }, [] )

  function classManager(){
    if(!!message.message){
      return <p className={`text-sm mt-2 text-green-500`}>{message.message}</p>
    }
    else if(!!message.error){
      return <p className={`text-sm mt-2 text-red-500`}>{message.error}</p>
    }
    else return <></>
  }

  return (
    <section className='flex items-center flex-col w-full overflow-auto pb-20'>
      <notifies.Container />
      <div className='flex flex-col w-full lg:w-3/5'>
        <h2 className='mb-3 font-medium'>Dados cadastrais</h2>
        <form 
          className='bg-white py-7 px-7 rounded-xl border border-gray-300/80 lg:border-gray-200/70'
          onSubmit={formikEmail.handleSubmit}  
        >
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>E-mail</h3>
            <input 
              type="text" 
              className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' 
              placeholder='E-mail de cadastro' 
              value={ formikEmail.values.email}
              onChange = { formikEmail.handleChange}
              id='email'
              onBlur={formikEmail.handleBlur}
            />
            {
              formikEmail.errors.email && formikEmail.touched.email && <p className='text-red-400 text-xs'>{`${formikEmail.errors.email}`}</p>
            }
          </div>
          <button 
            type='submit'
            className='bg-blue-500 text-white w-full rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-3'
          >
              {
                loading === true ?
                <>
                <img className='w-5 h-5 animate-spin' src={loadImg} alt="" />
                Processando
                </>:
                <>
                Alterar e-mail
                </>
              }
            </button>
            {
              classManager()
            }
            
        </form>
      </div>
      <div className='flex flex-col w-full lg:w-3/5 mt-4'>
        <h2 className='mb-3 font-medium'>Alterar senha</h2>
        <form 
          className='bg-white py-7 px-7 rounded-xl border border-gray-300/80 lg:border-gray-200/70'
          onSubmit={formikPw.handleSubmit}
        >
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>Senha atual</h3>
            <input 
              type="password" 
              className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' 
              placeholder='Senha atual'
              id='password'
              value={formikPw.values.password}
              onChange={formikPw.handleChange}
              onBlur={formikPw.handleBlur}
            />
            {
              formikPw.errors.password && formikPw.touched.password && <p className='text-red-400 text-xs'>{`${formikPw.errors.password}`}</p>
            }
          </div>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>Nova senha</h3>
            <input 
              type="password" 
              className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' 
              placeholder='Nova senha' 
              id='newPassword'
              value={formikPw.values.newPassword}
              onChange={formikPw.handleChange}
              onBlur={formikPw.handleBlur}
            />
            {
              formikPw.errors.newPassword && formikPw.touched.newPassword && <p className='text-red-400 text-xs'>{`${formikPw.errors.newPassword}`}</p>
            }
          </div>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <h3 className='text-sm font-medium'>Confirmar nova senha</h3>
            <input 
              type="password" 
              className='px-2 py-2.5 outline-none bg-gray-50 text-sm rounded-lg' 
              placeholder='Confirmar nova senha'
              id='confirmPassword'
              value={formikPw.values.confirmPassword}
              onChange={formikPw.handleChange}
              onBlur={formikPw.handleBlur}
            />
            {
              formikPw.errors.confirmPassword && formikPw.touched.confirmPassword && <p className='text-red-400 text-xs'>{`${formikPw.errors.confirmPassword}`}</p>
            }
          </div>
          <button className='bg-blue-500 text-white w-full rounded-lg py-3 text-sm font-medium'>Salvar alterações</button>
        </form>
      </div>
      <div className='flex flex-col w-full lg:w-3/5 mt-8'>
        <h3 className='font-medium mb-2'>Perdeu a senha?</h3>
        <p className='text-sm text-black mb-2'>Ao clicar no botão, uma nova senha será criada e enviada para o seu e-mail</p>
        <button className='bg-gray-300 text-sm w-full py-3 rounded-lg font-medium'>Perdi a senha</button>
      </div>
      <div className='flex flex-col w-full lg:w-3/5 mt-8 mb-16'>
        <h3 className='font-medium mb-2'>Sair da conta</h3>
        <button 
          className='flex items-center gap-1 text-red-500 font-medium w-fit'
          onClick={() => logout()}
        >
          <FiLogOut className='w-5 h-5' />Sair
        </button>
      </div> 
    </section>
  )
}
