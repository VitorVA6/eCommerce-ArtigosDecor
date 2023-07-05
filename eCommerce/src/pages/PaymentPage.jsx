import React, { useEffect, useState } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
import Card from '@mercadopago/sdk-react/bricks/cardPayment'
import axios from 'axios';
import PaymentBlock from '../components/PaymentBlock';
import InputPayment from '../components/InputPayment';
import {HiArrowNarrowRight} from 'react-icons/hi'
import {IoTicketOutline} from 'react-icons/io5'

export default function PaymentPage() {

    const [validCEP, setValidCEP] = useState(false)
    const [block1, setBlock1] = useState({selected:true, completed:false, disabled: false})
    const [block2, setBlock2] = useState({selected:false, completed:true, disabled: false})
    const [block3, setBlock3] = useState({selected:false, completed:false, disabled: true})
    const [changeBlock, setChangeBlock] = useState('1')

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] )

    useEffect(()=>{

      if(changeBlock === '1'){
        setBlock1(prev => ({...prev, selected: true, completed: false}))
        setBlock2(prev => ({...prev, selected: false}))
        setBlock3(prev => ({...prev, selected: false}))
      }
      else if(changeBlock === '2'){
        setBlock1(prev => ({...prev, selected: false}))
        setBlock2(prev => ({...prev, selected: true, completed: false}))
        setBlock3(prev => ({...prev, selected: false}))
      }
      else if(changeBlock === '3'){
        setBlock1(prev => ({...prev, selected: false}))
        setBlock2(prev => ({...prev, selected: false}))
        setBlock3(prev => ({...prev, selected: true, completed: false}))
      }

    }, [changeBlock])

  return (
    <div className='grid grid-cols-3 px-32 py-10 gap-5'>
        <div className='flex flex-col gap-5'>
          <PaymentBlock 
            step={'1'} 
            title={'Identifique-se'} 
            desc={'Informações pessoais e de contato.'} 
            selected={block1.selected}
            completed={block1.completed}
            disabled={block1.disabled}
            altDesc={''}
            setChange={setChangeBlock}
          >
            {
              block1.selected === true && 
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
              block1.completed === true && 
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
            selected={block2.selected}
            completed={block2.completed}
            disabled={block2.disabled}
            altDesc={'Preencha suas informações pessoais para continuar.'}
            setChange={setChangeBlock}
          >
            {
              block2.selected === true &&
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
              block2.completed === true && 
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
          selected={block3.selected}
          completed={block3.completed}
          disabled={block3.disabled}
          altDesc={'Preencha suas informações de entrega para continuar.'}
          setChange={setChangeBlock}
        >
          {
            block3.selected === true &&
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
          }
                
        </PaymentBlock>

        <div className='flex flex-col bg-white px-6 py-7 rounded-lg shadow-md/90 h-fit opacity-80'>
          <h2 className='font-bold text-lg mb-2.5'>RESUMO</h2>
          <p className='text-[13.5px] mb-1'>Tem um cupom?</p>
          <div className='flex gap-2'>
            <div className='grid grid-cols-10 items-center border rounded-md w-[70%]'>
              <div className='flex justify-center col-span-2'>
                <IoTicketOutline className='w-5 h-5 text-gray-400/80'/>
              </div>
              <input 
                className='py-2 px-1 outline-none col-span-8 text-[13.5px]' 
                type="text"
                placeholder='Código do cupom'
              />
            </div>
            <button className='text-[13.5px] text-blue-500 rounded-md w-[30%]'>Adicionar</button>
          </div>
          <div className='flex flex-col bg-gray-100/90 rounded-md px-5 py-6 mt-5 gap-4'>
            <div className='flex justify-between items-center text-sm'>
              <h3 className='font-bold'>Produtos</h3>
              <h3 className='font-bold'>R$ 108,90</h3>
            </div>
            <div className='flex justify-between items-center text-[#28be09]'>
              <h3 className='font-bold'>Total</h3>
              <h3 className='font-bold text-lg'>R$ 108,90</h3>
            </div>
          </div>
        </div>
    </div>
  )
}
