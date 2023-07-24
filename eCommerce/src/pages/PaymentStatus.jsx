import React, { useEffect, useState } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
import { StatusScreen } from '@mercadopago/sdk-react';
import { Link, useParams } from 'react-router-dom';
import loading from '../images/carregando.png'

export default function PaymentStatus() {

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] )

    const [loaded, setLoaded] = useState(false)
    const {id} = useParams()
    const initialization = {
        paymentId: id,
       };
       const onError = async (error) => {
        console.log(error);
       };
       const onReady = async () => {
            setLoaded(true)
       };
    
       const customization = {
        backUrls: {
          error: 'http://[::1]:5173/payment',
          return: 'http://[::1]:5173/',
        },
       };

  return (
    <div className='px-4 lg:px-10 pt-8 lg:pt-12 flex flex-col items-center'>
        <h1 className='flex text-2xl lg:text-[32px] font-black mb-10 lg:mb-[56px]'>Status de pagamento</h1>
        <div className={`w-full lg:w-1/2 gap-8 ${loaded===true?'flex':'hidden'} flex-col min-h-[400px] md:min-h-[405px] lg:min-h-[410px] xl:min-h-[410px]`}>
            <StatusScreen
                initialization={initialization}
                customization={customization}
                onReady={onReady}
                onError={onError}
            />
        </div>
        
        <div className={`w-full h-full justify-center items-center py-32 ${loaded===true?'hidden':'flex'}`}>
            <img src={loading} className='w-20 h-20 animate-spin'/>
        </div>
    </div>
  )
}
