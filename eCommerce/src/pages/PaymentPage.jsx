import React, { useEffect } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
import Card from '@mercadopago/sdk-react/bricks/cardPayment'

export default function PaymentPage() {

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] )
    
    

  return (
    <div className='flex flex-col items-center py-20'>
        <Card
          initialization={{ amount: 100 }}
          onSubmit={async (param) => {
            console.log(param);
          }}
    />
    </div>
  )
}
