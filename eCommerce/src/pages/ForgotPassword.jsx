import React, { useState } from 'react'
import {RiLockPasswordFill} from "react-icons/ri"
import InputPayment from '../components/InputPayment'
import { useUserContext } from '../contexts/User'
import notifies from '../utils/toastNotifies'
import sucessImg from '../images/mail_sent.svg'
import { Link } from 'react-router-dom'
import LoadingButton from '../components/LoadingButton'

export default function ForgotPassword() {

    const {forgotPassword} = useUserContext()
    const [email, setEmail] = useState('')
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const [sucess, setSucess] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleSubmit(){
        if(regexEmail.test(email)){
            setLoading(true)
            forgotPassword(email).then(data => {
                if(data.message){
                    setLoading(false)
                    setSucess(true)
                }else{
                    setLoading(false)
                    notifies.error(data.error)
                }
            })
        }
        else notifies.error("Formato de e-mail inválido")
    }

    return (
    <section className='flex flex-col justify-center items-center w-screen h-screen bg-[#f1f1f1] text-black/80'>
        <notifies.Container />
        {
            sucess ? 
            <div className='flex flex-col h-full w-full justify-center items-center gap-3'>
                <img className='w-96 h-96 -mb-20' src={sucessImg} alt='Imagem de sucesso.'/>
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-12'>
                    <h3 className='text-[32px] lg:text-[36px] font-bold text-color-primary'>E-mail enviado!</h3>
                    <p className='text-xl font-medium mb-8 text-gray-600'>Quase lá, um e-mail contendo o link para alterar a senha foi enviado para o seu e-mail.</p>
                    <Link 
                        to='/login' 
                        className='bg-color-primary rounded-sm text-white font-medium py-3 px-16'
                    >Voltar para o Login</Link>
                </div>
            </div> :

        <div className='flex flex-col justify-center items-center w-1/3 gap-5 bg-white px-16 pt-10 pb-16 rounded-md shadow-md shadow-gray-400/60'>
            <RiLockPasswordFill className='w-36 h-36 text-color-primary'/>
            <h1 className='font-bold text-3xl'>Esqueceu sua senha?</h1>
            <p className='text-sm'>Informe seu e-mail e receba o link para criar uma nova senha.</p>
            <InputPayment 
                title='E-mail' 
                placeholder='Digite seu e-mail' 
                field={email} 
                setField={(ev) => setEmail(ev.target.value)} 
                id='email' 
                blur={() => {}} 
                width='w-full'
            />
            <LoadingButton 
                loading={loading} 
                text='Enviar Link' 
                handleSubmit={handleSubmit} 
                full={true}/>
            
        </div>
        }
    </section>
  )
}