import React, { useEffect, useState } from 'react'
import PaymentBlock from '../components/PaymentBlock';
import InputPayment from '../components/InputPayment';
import {HiArrowNarrowRight} from 'react-icons/hi'
import PaymentResume from '../components/PaymentResume';
import MyCardBlock from '../components/MyCardBlock';

export default function PaymentPage() {

    const [validCEP, setValidCEP] = useState(false)
    const [block1, setBlock1] = useState({selected:true, completed:false, disabled: false})
    const [block2, setBlock2] = useState({selected:false, completed:true, disabled: false})
    const [block3, setBlock3] = useState({selected:false, completed:false, disabled: false})
    const [changeBlock, setChangeBlock] = useState('1')

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [whats, setWhats] = useState('')

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
            <div className='mt-3 -mx-[18px]'>
                <MyCardBlock />
            </div>    
          }
                
        </PaymentBlock>
        <PaymentResume />
    </div>
  )
}