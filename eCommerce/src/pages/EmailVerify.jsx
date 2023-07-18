import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { useUserContext } from '../contexts/User';
import sucessImg from '../images/Confirmed-bro.svg'
import errorImg from '../images/error.svg'

export default function EmailVerify() {
    const {checkAuth} = useUserContext()
    const [validUrl, setValidUrl] = useState(true);
	const {token} = useParams()

    useEffect( ()=>{
        checkAuth()
        axios.get(`/users/verify/${token}`)
        .then(({data})=> {
            setValidUrl(true)
        })
        .catch(err => setValidUrl(false))

    }, [] )

  return (
    <>
        {
            validUrl?
            <section className='flex flex-col w-full h-screen justify-center items-center gap-3'>
                <img className='w-96 h-96 -mb-20' src={sucessImg} alt='Imagem de sucesso.'/>
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-12'>
                    <h3 className='text-[36px] font-black text-green-500/90'>Sucesso na verificação!</h3>
                    <p className='text-xl font-medium mb-8 text-gray-600'>Parabéns, seu novo e-mail foi verificado, clique no link abaixo para voltar a Home.</p>
                    <Link to='/admin' className='bg-green-400 rounded-sm text-white font-medium py-3 px-16'>Voltar para a Home</Link>
                </div>
            </section>
            :
            <section className='flex flex-col w-full h-screen justify-center items-center bg-white'>
                <img className='w-80 h-80 -mb-8' src={errorImg} alt='Imagem de sucesso.'/>
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-12'>
                    <h3 className='text-[36px] font-black text-red-500/90'>Falha na verificação!</h3>
                    <p className='text-xl font-medium mb-8 text-gray-600'>Ops, provavelmente esse link já foi usado ou expirou.</p>
                    <Link to='/admin' className='bg-red-400 rounded-sm text-white font-medium py-3 px-16'>Voltar para a Home</Link>
                </div>
            </section>
        }
    </>
  )
}
