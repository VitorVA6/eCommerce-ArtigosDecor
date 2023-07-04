import React, { useEffect } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
import Card from '@mercadopago/sdk-react/bricks/cardPayment'
import axios from 'axios';
import PaymentBlock from '../components/PaymentBlock';
import InputPayment from '../components/InputPayment';
import {HiArrowNarrowRight} from 'react-icons/hi'

export default function PaymentPage() {

    /* useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] ) 
    
    <Card
          initialization={{ 
            amount: 100,
            payer: {
              email: 'mandradejunior.vva@gmail.com'
            } 
          }}
          onSubmit={async (param) => {
            const response = await axios.post('/mercado-pago/process_payment', param)
            console.log(response)
          }}
        />
    
    */
    
    

  return (
    <div className='grid grid-cols-3 items-center px-32 py-10'>
        <div className='flex flex-col gap-5'>
          <PaymentBlock step={'1'} title={'Identifique-se'} desc={'Utilizaremos seu e-mail para: Identificar seu perfil, histórico de compra, notificação de pedidos e carrinho de compras.'}>
            <div className='flex flex-col gap-4 mt-5'>
                <InputPayment title={'Nome completo'} placeholder={'ex.: Paulo Henrique Martins'}/>
                <InputPayment title={'E-mail'} placeholder={'ex.: paulo@gmail.com'}/>
                <InputPayment title={'CPF'} placeholder={'000.000.000-00'}/>
                <InputPayment title={'Ceular / Whatsapp'} placeholder={'(00) 00000-0000'}/>
            </div>
            <button className='flex justify-center items-center gap-2 text-white bg-green-500 font-bold py-3 mt-6 rounded-md'>
              Continuar
              <HiArrowNarrowRight className='w-6 h-6'/>
            </button>
          </PaymentBlock>

          <PaymentBlock step={'2'} title={'Entrega'} desc={'Informe o endereço de entrega.'}>
            <div className='flex flex-col mt-5 gap-4 w-full'>
              <div className='grid grid-cols-2'>
                <InputPayment title={'CEP'} placeholder={''}/>
              </div>
                <InputPayment title={'Endereço'} placeholder={''}/>
                <div className='grid grid-cols-3 gap-3'>
                  <InputPayment title={'Número'} placeholder={''}/>
                  <div className=' col-span-2'>
                    <InputPayment title={'Bairro'} placeholder={''}/>
                  </div>
                </div>
                <InputPayment title={'Complemento (opcional)'} placeholder={'(00) 00000-0000'}/>
            </div>
            <button className='flex justify-center items-center gap-2 text-white bg-green-500 font-bold py-3 mt-6 rounded-md'>
              Continuar
              <HiArrowNarrowRight className='w-6 h-6'/>
            </button>
          </PaymentBlock>
        </div>
        
    </div>
  )
}
