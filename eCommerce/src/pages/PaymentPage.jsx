import React, { useEffect, useState } from 'react'
import PaymentBlock from '../components/PaymentBlock';
import InputPayment from '../components/InputPayment';
import {HiArrowNarrowRight} from 'react-icons/hi'
import PaymentResume from '../components/PaymentResume';
import MyCardBlock from '../components/MyCardBlock';
import { useFormik } from 'formik';
import { block1Schema, block2Schema } from '../schemas';
import masks from '../utils/masks.js';
import axios from 'axios';
import checkComplete from '../utils/checkComplete';

export default function PaymentPage() {

    const [validCEP, setValidCEP] = useState(false)
    const [block1, setBlock1] = useState({selected:true, completed:false, disabled: false})
    const [block2, setBlock2] = useState({selected:false, completed:false, disabled: false})
    const [block3, setBlock3] = useState({selected:false, completed:false, disabled: true})
    const [changeBlock, setChangeBlock] = useState('1')
    const [errorCEP, setErrorCEP] = useState('')

    const formikStep1 = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: '',
        cpf: '',
        whats: ''
      },
      validationSchema: block1Schema,
      onSubmit: values =>{
      }
    })
    const formikStep2 = useFormik({
      enableReinitialize: true,
      initialValues: {
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        complemento: ''
      },
      validationSchema: block2Schema,
      onSubmit: values =>{
      }
    })

    useEffect(() => {
      if(formikStep2.values.cep.length === 9){
        axios.get(`https://viacep.com.br/ws/${formikStep2.values.cep}/json/`)
        .then(({data}) => {
          if(!!data.erro){
            formikStep2.setFieldValue('endereco', '')
            formikStep2.setFieldValue('bairro', '')
            setErrorCEP('CEP inválido.')
          }else{
            formikStep2.setFieldValue('endereco', data?.logradouro)
            formikStep2.setFieldValue('bairro', data?.bairro)
            setValidCEP(true)
          }
        })
        .catch(err => console.log(err)) 
      }
      else{
        setValidCEP(false)
        setErrorCEP('')
      }
    }, [formikStep2.values.cep])

    useEffect(()=>{
      if(changeBlock === '1'){
        setBlock1(prev => ({...prev, selected: true, completed: false}))
        setBlock2(prev => ({...prev, selected: false, completed: checkComplete(formikStep2.errors, formikStep2.values)}))
        setBlock3(prev => ({...prev, selected: false}))
      }
      else if(changeBlock === '2'){
        setBlock1(prev => ({...prev, selected: false, completed: checkComplete(formikStep1.errors, formikStep1.values)}))
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
                <form className='flex flex-col mt-3'>
                  <InputPayment 
                    title={'Nome completo'} 
                    placeholder={'ex.: Paulo Henrique Martins'}
                    field={ formikStep1.values.name}
                    setField = {formikStep1.handleChange}
                    id='name'
                    blur={formikStep1.handleBlur}
                    />
                    {
                      formikStep1.touched.name && formikStep1.errors.name && <p className='text-red-500 text-xs'>{`${formikStep1.errors.name}`}</p>
                    }
                    
                  <InputPayment 
                    title={'CPF'} 
                    placeholder={'000.000.000-00'}
                    field={ formikStep1.values.cpf}
                    setField = {(ev) => {
                      formikStep1.setFieldValue('cpf', masks.maskCPF(ev.target.value))
                    }}
                    id='cpf'
                    blur={formikStep1.handleBlur}
                  />
                    {
                      formikStep1.touched.cpf && formikStep1.errors.cpf && <p className='text-red-500 text-xs'>{`${formikStep1.errors.cpf}`}</p>
                    }
                  <InputPayment 
                    title={'Ceular / Whatsapp'} 
                    placeholder={'(00) 00000-0000'}
                    field={ formikStep1.values.whats}
                    setField = { (ev) => {
                      formikStep1.setFieldValue('whats', masks.maskWhats(ev.target.value))
                    }}
                    id='whats'
                    blur={formikStep1.handleBlur}/>
                    {
                      formikStep1.touched.whats && formikStep1.errors.whats && <p className='text-red-500 text-xs'>{`${formikStep1.errors.whats}`}</p>
                    }
                  <button className='flex justify-center items-center gap-2 text-white bg-green-500 font-bold py-3 mt-6 rounded-md'>
                    Continuar
                    <HiArrowNarrowRight className='w-6 h-6'/>
                  </button>
                </form>
              </>
            }
            {
              block1.completed === true && 
              <>
                <div className='flex flex-col mt-3'>
                  <h3 className='font-medium mb-3'>{`${formikStep1.values.name}`}</h3>
                  <h3 className='text-sm text-gray-600'>{`${formikStep1.values.cpf}`}</h3>
                  <h3 className='text-sm text-gray-600'>{`${formikStep1.values.whats}`}</h3> 
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
              <form className='flex flex-col mt-2 w-full'>
                <div className='grid grid-cols-2'>
                  <div className='flex flex-col'>
                    <InputPayment 
                      title={'CEP'} 
                      placeholder={''}
                      field={ formikStep2.values.cep}
                      setField = {(ev) => {
                        formikStep2.setFieldValue('cep', masks.maskCEP(ev.target.value))
                      }}
                      id='cep'
                      blur={formikStep2.handleBlur}
                    />
                    {
                      formikStep2.touched.cep && formikStep2.errors.cep && <p className='text-red-500 text-xs'>{`${formikStep2.errors.cep}`}</p>
                    }
                    {
                      errorCEP !== '' && <p className='text-red-500 text-xs'>{`${errorCEP}`}</p>
                    }
                  </div>
                  
                </div>
                {
                  validCEP && 
                  <>
                    <InputPayment 
                      title={'Endereço'} 
                      placeholder={''}
                      field={ formikStep2.values.endereco}
                      setField = {formikStep2.handleChange}
                      id='endereco'
                      blur={formikStep2.handleBlur}
                    />
                    {
                      formikStep2.touched.endereco && formikStep2.errors.endereco && <p className='text-red-500 text-xs'>{`${formikStep2.errors.endereco}`}</p>
                    }
                    <div className='grid grid-cols-3 gap-3'>
                      <div className='flex flex-col'>
                        <InputPayment 
                          title={'Número'} 
                          placeholder={''}
                          field={ formikStep2.values.numero}
                          setField = {formikStep2.handleChange}
                          id='numero'
                          blur={formikStep2.handleBlur}
                        />
                        {
                          formikStep2.touched.numero && formikStep2.errors.numero && <p className='text-red-400 text-xs'>{`${formikStep2.errors.numero}`}</p>
                        }
                      </div>                      
                      <div className=' col-span-2'>
                        <InputPayment 
                          title={'Bairro'} 
                          placeholder={''}
                          field={ formikStep2.values.bairro}
                          setField = {formikStep2.handleChange}
                          id='bairro'
                          blur={formikStep2.handleBlur}
                        />
                        {
                          formikStep2.touched.bairro && formikStep2.errors.bairro && <p className='text-red-400 text-xs'>{`${formikStep2.errors.bairro}`}</p>
                        }
                      </div>
                    </div>
                    <InputPayment title={'Complemento (opcional)'} placeholder={''}/>
                    <button className='flex justify-center items-center gap-2 text-white bg-green-500 font-bold py-3 mt-2 rounded-md'>
                      Continuar
                    <HiArrowNarrowRight className='w-6 h-6'/>
                  </button>
                  </>
                }
                
              </form>
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