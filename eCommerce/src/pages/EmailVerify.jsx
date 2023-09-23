import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { useUserContext } from '../contexts/User';
import sucessImg from '../images/Confirmed-bro.svg'
import errorImg from '../images/error.svg'
import Loading from '../components/Loading'
import SEO from '../components/SEO';

export default function EmailVerify() {
    const {checkAuth} = useUserContext()
    const [validUrl, setValidUrl] = useState(false);
	const {token} = useParams()
    const [loaded, setLoaded] = useState(false)

    useEffect( ()=>{
        checkAuth()
        axios.get(`/users/verify/${token}`)
        .then(({data})=> {
            setValidUrl(true)
            setLoaded(true)
        })
        .catch(err => {
            setValidUrl(false)
            setLoaded(true)
        })
    }, [] )

  return (
    <>
    <SEO
        title='Verificação de e-mail'
        description='Verifique se o endereço de e-mail que deseja utilizar para login é válido.'
        url = {`https://artigosdecor.render.com/users/verify/${token}`}
        canonical = {`https://artigosdecor.render.com/users/verify/${token}`}
        keywords = 'verificação, e-mail'
    />
    <div className='h-screen'>
        {
            loaded === true ?
        <>
        {
            validUrl?
            <div className='flex flex-col h-full w-full justify-center items-center gap-3'>
                <img className='w-96 h-96 -mb-20' src={sucessImg} alt='Imagem de sucesso.'/>
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-12'>
                    <h3 className='text-[32px] lg:text-[36px] font-black text-green-500/90'>Sucesso na verificação!</h3>
                    <p className='text-xl font-medium mb-8 text-gray-600'>Parabéns, seu novo e-mail foi verificado, clique no link abaixo para voltar a Home.</p>
                    <Link to='/admin' className='bg-green-400 rounded-sm text-white font-medium py-3 px-16'>Voltar para a Home</Link>
                </div>
            </div>
            :
            <div className='flex flex-col h-full w-full justify-center items-center bg-white'>
                <img className='w-80 h-80 -mb-8' src={errorImg} alt='Imagem de sucesso.'/>
                <div className='flex flex-col py-10 px-10 justify-center items-center mb-12'>
                    <h3 className='text-[32px] md:text-[42px] lg:text-[36px] font-black text-red-500/90'>Falha na verificação!</h3>
                    <p className='text-xl font-medium mb-8 text-gray-600'>Ops, provavelmente esse link já foi usado ou expirou.</p>
                    <Link to='/admin' className='bg-red-400 md:text-xl lg:text-base rounded-sm text-white font-medium py-3 px-16'>Voltar para a Home</Link>
                </div>
            </div>
        }
        </>
        :
        <Loading />
        }
    </div>
    </>
  )
}
