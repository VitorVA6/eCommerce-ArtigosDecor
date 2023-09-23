import React, { useEffect, useState } from 'react'
import { FiLogOut } from "react-icons/fi";
import { useUserContext } from '../contexts/User';
import {useFormik} from 'formik'
import { emailSchema, passwordSchema } from '../schemas';
import notifies from '../utils/toastNotifies';
import LoadingButton from './LoadingButton';
import InputAdmin from './InputAdmin';

export default function ContaAdmin() {
  const { email, logout, getUser, updateUser } = useUserContext()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [message, setMessage] = useState('')
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
      setLoading2(true)
      updateUser({senhaAtual: values.password, novaSenha: values.newPassword})
      .then(data => {
        setLoading2(false)
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
          <div className='flex flex-col w-full gap-1 mb-5'>
            <InputAdmin 
              title={'E-mail'} 
              value={formikEmail.values.email} 
              setValue={formikEmail.handleChange} 
              placeholder='E-mail de cadastro'
              handleBlur={formikEmail.handleBlur}
              id={'email'}/>
            {
              formikEmail.errors.email && formikEmail.touched.email && <p className='text-red-400 text-xs'>{`${formikEmail.errors.email}`}</p>
            }
          </div>
            <LoadingButton 
              loading={loading} 
              text={'Alterar e-mail'} 
              handleSubmit={undefined} 
              full={true}
              bg_color='bg-blue-500'
            />
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
            <InputAdmin 
              title={'Senha atual'} 
              value={formikPw.values.password} 
              setValue={formikPw.handleChange} 
              placeholder='Senha atual'
              handleBlur={formikPw.handleBlur}
              id={'password'}
              type='password'/>
            {
              formikPw.errors.password && formikPw.touched.password && <p className='text-red-400 text-xs'>{`${formikPw.errors.password}`}</p>
            }
          </div>
          <div className='flex flex-col w-full gap-2 mb-5'>
          <InputAdmin 
            title={'Nova senha'} 
            value={formikPw.values.newPassword} 
            setValue={formikPw.handleChange} 
            placeholder='Nova senha'
            handleBlur={formikPw.handleBlur}
            id={'newPassword'}
            type='password'
            />
            {
              formikPw.errors.newPassword && formikPw.touched.newPassword && <p className='text-red-400 text-xs'>{`${formikPw.errors.newPassword}`}</p>
            }
          </div>
          <div className='flex flex-col w-full gap-2 mb-5'>
            <InputAdmin 
              title={'Confirmar nova senha'} 
              value={formikPw.values.confirmPassword} 
              setValue={formikPw.handleChange} 
              placeholder='Confirmar nova senha'
              handleBlur={formikPw.handleBlur}
              id={'confirmPassword'}
              type='password'
              />
            {
              formikPw.errors.confirmPassword && formikPw.touched.confirmPassword && <p className='text-red-400 text-xs'>{`${formikPw.errors.confirmPassword}`}</p>
            }
          </div>
          <LoadingButton 
            loading={loading2} 
            text={'Salvar alterações'} 
            handleSubmit={undefined} 
            full={true}
            bg_color='bg-blue-500'
          />
        </form>
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
