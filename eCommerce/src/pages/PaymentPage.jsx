import React, {useEffect, useState} from 'react'
import PaymentBlock from '../components/PaymentBlock';
import InputPayment from '../components/InputPayment';
import {HiArrowNarrowRight} from 'react-icons/hi'
import PaymentResume from '../components/PaymentResume';
import MyCardBlock from '../components/MyCardBlock';
import masks from '../utils/masks.js';
import { usePaymentContext } from '../contexts/Payment';
import ProgressbarPayment from '../components/ProgressbarPayment';
import { useCatalogContext } from '../contexts/Catalog';
import { useCarrinhoContext } from '../contexts/Carrinho';
import ShipOption from '../components/ShipOption';
import { scrollToDiv } from '../utils/scroll';

export default function PaymentPage() {

    const {
      formikStep1, formikStep2, validCEP, errorCEP, cepIsValid, blockManager, block1, block2, block3, setChangeBlock, changeBlock
    } = usePaymentContext()
    const {catalog} = useCatalogContext()
    const {freight, setFreight, deliveryOptions} = useCarrinhoContext()

    const [selectError, setSelectError] = useState(false)

    useEffect(() => {
        cepIsValid()
    }, [formikStep2.values.cep])

    useEffect(()=>{
      blockManager()
    }, [changeBlock])

    function handleCustomShip(){
      const city = catalog.shipCustom.cities.find(el => el.city.label === formikStep2.values.cidade)
      if(catalog.shipCustom.status === true && !!city){
          return (
          <ShipOption
              name = {catalog.shipCustom.deliveryName} 
              time = '1 a 2 dias'
              price = {city.price}
              freight={freight}
              setFreight={(value) => {
                setFreight(value)
                setSelectError(false)
              }}
              myFreight = {deliveryOptions.custom}
              width='w-full'
          />
          )
      }
  }

  function handleCorreiosShip(){
      if(catalog.shipCorreios.status === true){
          if(catalog.shipCorreios.sedex === true){
              return (
                  <>
                      <ShipOption 
                          name='Correios - PAC' 
                          time='9 a 12 dias' 
                          price={24.5}
                          freight={freight}
                          setFreight={(value) => {
                            setFreight(value)
                            setSelectError(false)
                          }}
                          myFreight = {deliveryOptions.pac}
                          width='w-full'
                      />
                      <ShipOption 
                          name='Correios - Sedex' 
                          time='7 a 10 dias' 
                          price={29.5}
                          freight={freight}
                          setFreight={(value) => {
                            setFreight(value)
                            setSelectError(false)
                          }}
                          myFreight = {deliveryOptions.sedex}
                          width='w-full'
                      />
                  </>
              )
          }
          return <ShipOption 
              name='Correios - PAC' 
              time='9 a 12 dias' 
              price={masks.maskCurrency(checkShipFree(24.5))}
              freight={freight}
              setFreight={(value) => {
                setFreight(value)
                setSelectError(false)
              }}
              myFreight = {deliveryOptions.pac}
              width='w-full'
          />
      }
  }
    
  return (
    <div className='grid xl:grid-cols-3 md:px-36 lg:px-64 xl:px-32 py-10 gap-5'>
        <ProgressbarPayment />
        <div className='order-2 xl:order-1 flex flex-col gap-3'>
          <PaymentBlock 
            step={'1'} 
            title={'Identifique-se'} 
            desc={'Informações pessoais e de contato.'} 
            selected={block1.selected}
            completed={block1.completed}
            disabled={block1.disabled}
            altDesc={''}
            setChange={setChangeBlock}
            change={changeBlock}
          >
            {
              block1.selected === true && 
              <>
                <form 
                  className='flex flex-col mt-3 gap-2'
                  onSubmit={formikStep1.handleSubmit}
                >
                  <InputPayment
                    placeholder={'Nome completo'}
                    field={ formikStep1.values.name}
                    setField = {formikStep1.handleChange}
                    id='name'
                    blur={formikStep1.handleBlur}
                    />
                    {
                      formikStep1.touched.name && formikStep1.errors.name && <p className='text-red-500 text-xs'>{`${formikStep1.errors.name}`}</p>
                    }
                    
                  <InputPayment
                    placeholder={'CPF'}
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
                    placeholder={'Número de celular'}
                    field={ formikStep1.values.whats}
                    setField = { (ev) => {
                      formikStep1.setFieldValue('whats', masks.maskWhats(ev.target.value))
                    }}
                    id='whats'
                    blur={formikStep1.handleBlur}/>
                    {
                      formikStep1.touched.whats && formikStep1.errors.whats && <p className='text-red-500 text-xs'>{`${formikStep1.errors.whats}`}</p>
                    }
                  <button className='flex justify-center items-center gap-2 text-white bg-color-primary font-bold py-3 mt-6 rounded-md'>
                    Continuar
                    <HiArrowNarrowRight className='w-6 h-6'/>
                  </button>
                </form>
              </>
            }
            {
              block1.completed === true && 
              <>
                <div className='flex flex-col'>
                  <h3 className='font-medium mb-1'>{`${formikStep1.values.name}`}</h3>
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
            change={changeBlock}
          >
            {
              block2.selected === true &&
              <form 
                className='flex flex-col mt-2 w-full gap-2'
                onSubmit={(e) => {
                  e.preventDefault()
                  if((catalog.shipCustom.status || catalog.shipCorreios.status) && freight.delivery === deliveryOptions.unselected){
                    setSelectError(true)
                    return
                  }
                  formikStep2.handleSubmit()
                  scrollToDiv
                }}
              >
                <div className='grid grid-cols-2'>
                  <div className='flex flex-col'>
                    <InputPayment
                      placeholder={'CEP'}
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
                      placeholder={'Endereço. Ex: Rua Machado de Assis'}
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
                          placeholder={'Número'}
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
                          placeholder={'Bairro'}
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
                    <div className='grid grid-cols-3 gap-3'>
                      <div className='flex flex-col col-span-2'>
                        <InputPayment
                          placeholder={'Cidade'}
                          field={ formikStep2.values.cidade}
                          setField = {formikStep2.handleChange}
                          id='cidade'
                          blur={formikStep2.handleBlur}
                        />
                        {
                          formikStep2.touched.cidade && formikStep2.errors.cidade && <p className='text-red-400 text-xs'>{`${formikStep2.errors.cidade}`}</p>
                        }
                      </div>                      
                      <div className=''>
                        <InputPayment
                          placeholder={'Estado'}
                          field={formikStep2.values.estado}
                          setField = {formikStep2.handleChange}
                          id='estado'
                          blur={formikStep2.handleBlur}
                        />
                        {
                          formikStep2.touched.estado && formikStep2.errors.estado && <p className='text-red-400 text-xs'>{`${formikStep2.errors.estado}`}</p>
                        }
                      </div>
                    </div>
                    <InputPayment title={'Complemento (opcional)'} placeholder={''}/>
                    <div className='flex flex-col gap-2'>
                      {
                        (catalog.shipCustom.status === true || catalog.shipCorreios.status === true) &&
                        <>
                        <div className='mt-4 mb-2'>
                          <h3 className='font-medium text-gray-500 text-[15px]'>
                              Selecione uma forma de envio:
                          </h3>
                          {
                            selectError && <p className='text-xs text-red-400 -mt-1'>Campo obrigatório</p>
                          }
                        </div>
                        {
                        handleCustomShip()
                        }
                        {
                        handleCorreiosShip()
                        }
                        </>
                      }
                    </div>
                    <button 
                      className='flex justify-center items-center gap-2 text-white bg-color-primary font-bold py-3 mt-4 rounded-md'>
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
          change={changeBlock}
        >
          {
            block3.selected === true &&
            <MyCardBlock />   
          } 
        </PaymentBlock>
        <PaymentResume />
    </div>
  )
}