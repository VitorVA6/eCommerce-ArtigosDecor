import React, { useEffect, useState } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
import { StatusScreen } from '@mercadopago/sdk-react';
import {useParams} from 'react-router-dom';
import Loading from '../components/Loading';

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
        <h1 className='flex text-2xl lg:text-[32px] font-bold mb-10 lg:mb-[56px] text-black/80'>Status de pagamento</h1>
        <div className={`w-full lg:w-1/2 gap-8 ${loaded===true?'flex':'hidden'} flex-col min-h-[400px] md:min-h-[405px] lg:min-h-[410px] xl:min-h-[410px]`}>
            <StatusScreen
                initialization={initialization}
                customization={customization}
                onReady={onReady}
                onError={onError}
            />
        </div>
        <Loading loaded={loaded}/>
    </div>
  )
}
