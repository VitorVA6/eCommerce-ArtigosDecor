import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { useUserContext } from '../contexts/User';
import {AiFillCheckCircle} from 'react-icons/ai'
import {AiFillDislike} from 'react-icons/ai'

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
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-32  gap-5'>
                    <AiFillCheckCircle className='w-32 h-32 text-green-500'/>
                    <h3 className='text-2xl font-medium'>Sucesso na verificação</h3>
                    <p className='text-lg font-medium'>Parabéns, seu novo e-mail foi verificado, clique no link abaixo para voltar a Home!</p>
                    <Link to='/admin' className='bg-blue-500 rounded-lg text-white font-medium py-2.5 px-6'>Voltar para a home</Link>
                </div>
            </section>
            :
            <section className='flex flex-col w-full h-screen justify-center items-center'>
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-32  gap-5'>
                    <AiFillDislike className='w-32 h-32 text-red-500'/>
                    <h3 className='text-2xl font-medium'>Falha na verificação</h3>
                    <p className='text-lg font-medium'>Ops, provavelmente esse link já foi usado ou expirou!</p>
                    <Link to='/admin' className='bg-blue-500 rounded-lg text-white font-medium py-2.5 px-6'>Voltar para a home</Link>
                </div>
            </section>
        }
        
    </>
  )
}
