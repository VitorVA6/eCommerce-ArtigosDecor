import React, { useEffect, useState } from 'react'
import BaseModal from './BaseModal'
import InputPayment from './InputPayment'
import masks from '../utils/masks'
import SelectAdmin from './SelectAdmin'
import LoadingButton from './LoadingButton'
import { useCatalogContext } from '../contexts/Catalog'

export default function ModalFreeShip({setModalFree, notifyError, notifySucess}) {

    const {catalog, updateCatalog, setCatalog} = useCatalogContext()

    const localOptions = {
        city: 'CITY',
        state: 'STATE',
        all: 'ALL'
    }

    const [animate, setAnimate] = useState(true)
    const [loading, setLoading] = useState(false)

    function closeModal(){
        setAnimate(false)
        setTimeout(() => setModalFree(false), 200)
    }

    useEffect(() => {
        if(typeof(catalog.shipFree.minValue) === 'number'){
            setCatalog(prev => ({
                ...prev, 
                shipFree: {...prev.shipFree, 
                    minValue: masks.maskCurrency(prev.shipFree.minValue)
                }
            }
            ))
        }
    }, [])

    function handleValidLocals(local){
        setCatalog(prev => ({
            ...prev, 
            shipFree: {...prev.shipFree, 
                validLocals: local
            }
        }
        ))
    }

    function handleSubmit(){
        setLoading(true)
        updateCatalog().then(data => {
            setLoading(false)
            if(!!data.message){
                closeModal()
                notifySucess(data.message)
            }
            else{
                notifyError(data.error)
            }
        })
    }

  return (
    <BaseModal animate={animate} closeModal={closeModal} width={'lg:w-2/5'} top={'lg:top-20'}>
        <h2 className='text-center py-3 border-b w-full font-medium relative border-gray-300'>Frete grátis</h2>
        <div className='flex flex-col pt-8 pb-5 px-7 w-full'>
            <h3 className='text-[15px] font-medium'>Valor mínimo em compras</h3>
            <p className='text-gray-500 text-sm mb-2'>Defina o valor mínimo em compras para habilitar o frete grátis. Deixe em branco para habilitar para qualquer valor.</p>
            <InputPayment 
                placeholder='R$' 
                field={catalog.shipFree.minValue} 
                setField={(ev) => setCatalog(prev => ({
                    ...prev, 
                    shipFree: {...prev.shipFree, 
                        minValue: masks.maskCurrency(ev.target.value)
                    }
                }
                ))}
                id='min-value' 
                blur={()=>{}} width='w-1/5'
            />
            <h3 className='text-[15px] font-medium mt-5'>Locais válidos</h3>
            <p className='text-gray-500 text-sm mb-2'>Defina os locais em que o frete grátis é válido. Deixe em branco para habilitar para qualquer lugar.</p>
            <div className='flex flex-col gap-1 text-black-90 mb-6'>
                <SelectAdmin 
                    option={localOptions.city} 
                    text='Apenas para minha cidade'
                    selectedOption={catalog.shipFree.validLocals}
                    setSelectedOption={() => handleValidLocals(localOptions.city)}  
                />
                <SelectAdmin 
                    option={localOptions.state} 
                    text='Apenas para meu estado'
                    selectedOption={catalog.shipFree.validLocals}
                    setSelectedOption={() => handleValidLocals(localOptions.state)}  
                />
                <SelectAdmin 
                    option={localOptions.all}
                    text='Todos'
                    selectedOption={catalog.shipFree.validLocals}
                    setSelectedOption={() => handleValidLocals(localOptions.all)}
                />
            </div>
            <LoadingButton 
                loading={loading} 
                text='Salvar alterações' 
                full={true} 
                handleSubmit={() => handleSubmit()}/>
        </div>
    </BaseModal>
  )
}
