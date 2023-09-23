import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InputPayment from '../components/InputPayment'
import {RiLockPasswordFill} from "react-icons/ri"
import notifies from '../utils/toastNotifies'
import LoadingButton from '../components/LoadingButton'
import { useUserContext } from '../contexts/User'
import sucessImg from '../images/Confirmed-bro.svg'
import SEO from '../components/SEO'


export default function ResetPassword() {
    const {resetPassword} = useUserContext()
    const [password, set_password] = useState('')
    const [confirm_password, set_confirm_password] = useState('')
    const [sucess, setSucess] = useState(false)
    const [loading, setLoading] = useState(false)
    const {token} = useParams()

    function handleSubmit(){
        if(password.length < 8) {
            notifies.error("Senha precisa ter pelo menos 8 caracteres")
            return
        }
        if(password !== confirm_password){
            notifies.error("Senhas não batem")
            return
        }
        setLoading(true)
        resetPassword(token.replace(/1-1/g, '.'), password).then(data => {
            if(data.message){
                setLoading(false)
                setSucess(true)
            }else{
                setLoading(false)
                notifies.error(data.error)
            }
        })
    }

  return (
    <>
    <SEO
        title='Redefinir Senha'
        description='Refenina uma nova senha informando-a nos campos senha e confirmar senha.'
        url = {`https://artigosdecor.render.com/users/reset/${token}`}
        canonical = {`https://artigosdecor.render.com/users/reset/${token}`}
        keywords = 'refenir, senha'
    />
    <section className='flex flex-col justify-center items-center w-screen h-screen bg-[#f1f1f1] text-black/80'>
        <notifies.Container />
        {
        sucess ? 
        <div className='flex flex-col h-full w-full justify-center items-center gap-3'>
            <img className='w-96 h-96 -mb-20' src={sucessImg} alt='Imagem de sucesso.'/>
            <div className='flex flex-col py-10 px-10 justify-center items-center mb-12'>
                <h3 className='text-[32px] lg:text-[36px] font-bold text-green-400'>Senha atualizada</h3>
                <p className='text-xl font-medium mb-8 text-gray-600'>Você conseguiu, sua nova senha já está disponível para você efetuar login.</p>
                <Link
                    to='/login' 
                    className='bg-green-500 rounded-sm text-white font-medium py-3 px-16'
                >Voltar para o Login</Link>
            </div>
        </div> :
        <div className='flex flex-col justify-center items-center w-1/3 gap-5 bg-white px-16 pt-10 pb-16 rounded-md shadow-md shadow-gray-400/60'>
            <RiLockPasswordFill className='w-36 h-36 text-color-primary'/>
            <h1 className='font-bold text-3xl'>Redefinir senha</h1>
            <p className='text-sm'>Informe sua nova senha com pelo menos 8 dígitos.</p>
            <InputPayment
                title='Senha' 
                placeholder='Digite a nova senha' 
                field={password} 
                setField={(ev) => set_password(ev.target.value)} 
                id='password' 
                blur={() => {}} 
                width='w-full'
            />
            <InputPayment
                title='Confirmar senha'
                placeholder='Digite a senha novamente' 
                field={confirm_password} 
                setField={(ev) => set_confirm_password(ev.target.value)} 
                id='confirm-password' 
                blur={() => {}} 
                width='w-full'
            />
            <LoadingButton
                loading={loading} 
                text='Mudar Senha' 
                handleSubmit={handleSubmit} 
                full={true}/>
        </div>
        }
    </section>
    </>
  )
}
