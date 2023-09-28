import React, { useState } from 'react'
import { StatusScreen } from '@mercadopago/sdk-react';
import {useParams} from 'react-router-dom';
import Loading from '../components/Loading';
import SEO from '../components/SEO';

export default function PaymentStatus() {
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
            error: `${import.meta.env.VITE_MY_URL}payment`,
            return: import.meta.env.VITE_MY_URL,
        },
       };

  return (
    <>
    <SEO 
        title='Status de Pagamento'
        description='Informa o status do pagamento do seu pedido'
        url = {`https://artigosdecor.render.com/payment-status/${id}`}
        canonical = {`https://artigosdecor.render.com/payment-status/${id}`}
        keywords = 'pagamento, checkout, mercado pago, status'
    />
    <div className='px-4 lg:px-10 pt-8 lg:pt-12 flex flex-col items-center pb-16'>
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
    </>
  )
}
