import React, { useState } from 'react'
import BaseModal from './BaseModal'
import Select from 'react-select'
import Switch from '@mui/material/Switch'
import LoadingButton from './LoadingButton'
import { useCatalogContext } from '../contexts/Catalog'

export default function ModalCorreios({setModalCorreios, notifyError, notifySucess}) {

    const {catalog, setCatalog, updateCatalog} = useCatalogContext()

    const [animate, setAnimate] = useState(true)
    const [loading, setLoading] = useState(false)

    const options = [{label:'1 dia', value: 1} , {label:'2 dias', value: 2}, {label:'3 dias', value:3}, {label:'4 dias', value: 4}, {label:'5 dias', value: 5}, {label: '6 dias', value: 6}, {label: '7 dias', value: 7}, {label: '8 dias', value: 8}, {label: '9 dias', value: 9}, {label: '10 dias', value: 10}, {label: '11 dias', value: 11}, {label: '12 dias', value: 12}, {label: '13 dias', value: 13}, {label: '14 dias', value: 14}, {label: '15 dias', value: 15}]

    function closeModal(){
        setAnimate(false)
        setTimeout(() => setModalCorreios(false), 200)
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
        <h2 className='text-center py-3 border-b w-full font-medium relative border-gray-300'>Correios</h2>
        <div className='flex flex-col pt-8 pb-5 px-7 w-full'>
            <h3 className='text-[15px] font-medium mb-3'>Selecione as formas de entrega</h3>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between w-full py-1.5 px-4 items-center rounded-lg border border-gray-300'>
                    <h2 className='font-medium text-sm'>PAC</h2>
                    <Switch disabled defaultChecked/>
                </div>
                <div className='flex justify-between w-full py-1.5 px-4 items-center rounded-lg border border-gray-300'>
                    <h2 className='font-medium text-sm'>SEDEX</h2>
                    <Switch 
                        checked={catalog.shipCorreios.sedex}
                        onChange={(ev) => setCatalog(prev => ({...prev, shipCorreios: {...prev.shipCorreios, sedex: ev.target.checked}}))}
                    />
                </div>
            </div>
            <div className='flex justify-between w-full items-center mb-3 mt-6'>
                <h2 className='font-medium'>Desabilitar PAC para minha cidade</h2>
                <Switch 
                    checked={catalog.shipCorreios.pacMyCity}
                    onChange={(ev) => setCatalog(prev => ({...prev, shipCorreios: {...prev.shipCorreios, pacMyCity: ev.target.checked}}))}
                />
            </div>
            <div className='flex flex-col mb-6'>
                <h3 className='text-[15px] font-medium mb-0.5'>Tempo adicional de entrega</h3>
                <p className='text-gray-500/70 text-sm mb-4 leading-4'>Quanto tempo você leva para preparar e postar seus produtos em uma agência dos corrreios? Adicione esse tempo adicional abaixo.</p>
                <Select 
                    className='text-sm'
                    value={catalog.shipCorreios.days} 
                    onChange = {(value) => setCatalog(p=>({...p, shipCorreios: {...p.shipCorreios, days: value}}))}
                    options={options}
                /> 
            </div>
            <LoadingButton loading={loading} text='Salvar alterações' full={true} handleSubmit={handleSubmit} />
        </div>
    </BaseModal>
  )
}
