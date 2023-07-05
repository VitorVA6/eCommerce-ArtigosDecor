import React, { useEffect, useState } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
import Card from '@mercadopago/sdk-react/bricks/cardPayment'
import axios from 'axios';
import PaymentBlock from '../components/PaymentBlock';
import InputPayment from '../components/InputPayment';
import {HiArrowNarrowRight} from 'react-icons/hi'

export default function PaymentPage() {

    const [validCEP, setValidCEP] = useState(false)
    const [blockManager, setBlockManager] = useState({
      block1: {
        selected: false,
        completed: true,
        disabled: false
      },
      block2: {
        selected: false,
        completed: true,
        disabled: false
      },
      block3: {
        selected: false,
        completed: false,
        disabled: true
      }
    })

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] ) 

  return (
    <div className='grid grid-cols-3 px-32 py-10 gap-5'>
        <div className='flex flex-col gap-5'>
          <PaymentBlock 
            step={'1'} 
            title={'Identifique-se'} 
            desc={'Informações pessoais e de contato.'} 
            selected={blockManager.block1.selected}
            completed={blockManager.block1.completed}
            disabled={blockManager.block1.disabled}
            altDesc={''}
            
          >
            {
              blockManager.block1.selected === true && 
              <>
                <div className='flex flex-col gap-4 mt-3'>
                <InputPayment title={'Nome completo'} placeholder={'ex.: Paulo Henrique Martins'}/>
                <InputPayment title={'E-mail'} placeholder={'ex.: paulo@gmail.com'}/>
                <InputPayment title={'CPF'} placeholder={'000.000.000-00'}/>
                <InputPayment title={'Ceular / Whatsapp'} placeholder={'(00) 00000-0000'}/>
                </div>
                <button className='flex justify-center items-center gap-2 text-white bg-green-500 font-bold py-3 mt-6 rounded-md'>
                  Continuar
                  <HiArrowNarrowRight className='w-6 h-6'/>
                </button>
              </>
            }
            {
              blockManager.block1.completed === true && 
              <>
                <div className='flex flex-col mt-3'>
                  <h3 className='font-medium mb-3'>Vitor Vaz Andrade</h3>
                  <h3 className='text-sm text-gray-600'>mandradejunior.vva@gmail.com</h3>
                  <h3 className='text-sm text-gray-600'>CPF 066.533.075-81</h3> 
                </div>
              </>
            }
            
          </PaymentBlock>

          <PaymentBlock 
            step={'2'} 
            title={'Entrega'} 
            desc={'Informe o endereço de entrega.'}
            selected={blockManager.block2.selected}
            completed={blockManager.block2.completed}
            disabled={blockManager.block2.disabled}
            altDesc={'Preencha suas informações pessoais para continuar.'}
          >
            {
              blockManager.block2.selected === true &&
              <div className='flex flex-col mt-2 gap-4 w-full'>
                <div className='grid grid-cols-2'>
                  <InputPayment title={'CEP'} placeholder={''}/>
                </div>
                {
                  validCEP && 
                  <>
                    <InputPayment title={'Endereço'} placeholder={''}/>
                    <div className='grid grid-cols-3 gap-3'>
                      <InputPayment title={'Número'} placeholder={''}/>
                      <div className=' col-span-2'>
                        <InputPayment title={'Bairro'} placeholder={''}/>
                      </div>
                    </div>
                    <InputPayment title={'Complemento (opcional)'} placeholder={'(00) 00000-0000'}/>
                    <button className='flex justify-center items-center gap-2 text-white bg-green-500 font-bold py-3 mt-2 rounded-md'>
                      Continuar
                    <HiArrowNarrowRight className='w-6 h-6'/>
                  </button>
                  </>
                }
                
              </div>
            }

            {
              blockManager.block2.completed === true && 
              <div className='flex flex-col'>
                <h3 className='font-medium mb-1'>Endereço para entrega:</h3>
                <h3 className='text-sm text-gray-600'>Caminho 18, 11 - Campo Limpo</h3>
                <h3 className='text-sm text-gray-600'>Feira de Santana-BA | CEP 44034-292</h3> 
              </div>
            }
            
          </PaymentBlock>
        </div>

        <PaymentBlock 
          step={'3'} 
          title={'Pagamento'} 
          desc={'Informe os dados do cartão.'}
          selected={blockManager.block3.selected}
          completed={blockManager.block3.completed}
          disabled={blockManager.block3.disabled}
          altDesc={'Preencha suas informações de entrega para continuar.'}
        >
          <div className='border border-gray-300 rounded-md mt-3'>
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
          </div>          
        </PaymentBlock>
        
    </div>
  )
}
