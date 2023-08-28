import React, { useEffect, useState } from 'react'
import ShipType from './ShipType'
import SelectAdmin from './SelectAdmin'
import ModalAddress from './ModalAddress'
import notifies from '../utils/toastNotifies'
import { useCatalogContext } from '../contexts/Catalog'
import LoadingButton from './LoadingButton'

export default function ShipmentAdmin() {

  const shipOptions = {
    pickup: 'PICKUP',
    delivery: 'DELIVERY',
    both: 'BOTH'
}
  
  const {getCatalog, catalog, updateCatalog} = useCatalogContext()

  useEffect(() => {
    getCatalog()
  }, [])

  const [statusFree, setStatusFree] = useState(false)
  const [statusCustom, setStatusCustom] = useState(false)
  const [statusCorreios, setStatusCorreios] = useState(false)

  const [modalAddress, setModalAddress] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(){
    setLoading(true)
    updateCatalog().then(data => {
      setLoading(false)
      if(!!data.message){
        notifies.sucess(data.message)
        getCatalog()
      }
      else{
        notifies.error(data.error)
      }
    })
  }

  return (
    <div className='flex items-center flex-col w-full h-screen'>
      <notifies.Container />
        {modalAddress && <ModalAddress setModalAddress={setModalAddress} notifyError={notifies.error} notifySucess={notifies.sucess}/>}
        <div className='flex flex-col w-full lg:w-3/4 bg-white py-10 px-4 lg:px-7 rounded-xl border border-gray-300/80 lg:border-gray-200/70'>
            <h1 className='text-black/90 font-medium'>Tipo de entrega</h1>
            <p className='text-gray-500/80 text-sm mb-5'>Selecione os tipos de entrega que você irá utilizar</p>
            <div className='flex flex-col gap-2 w-full mb-6'>
              <ShipType title='Frete grátis' status={statusFree} setStatus={setStatusFree}/>
              <ShipType title='Frete personalizado' status={statusCustom} setStatus={setStatusCustom}/>
              <ShipType title='Frete grátis' status={statusCorreios} setStatus={setStatusCorreios}/>
            </div>  
            <h1 className='text-black/90 font-medium mb-3'>Como seus clientes podem receber seus produtos?</h1>
            <div className='flex flex-col gap-3 text-black-90 mb-5'>
              <SelectAdmin 
                option={shipOptions.delivery} 
                text='Somente entrega'/>
              <SelectAdmin 
                option={shipOptions.pickup} 
                text='Somente retirada no local' />
              <SelectAdmin 
                option={shipOptions.both} 
                text='Entrega e retirada no local'/>
            </div>
            <h1 className='text-black/90 font-medium'>Endereço da loja</h1>
            <p className='text-gray-500/80 text-sm mb-2.5'>Endereço de origem das entregas e/ou retirada</p>
            {
            catalog.address.cep !== '' &&
            <div className='flex flex-col text-[13px] text-gray-500/80 mb-1'>
              <p>{catalog.address.cep}</p>
              <p>{`${catalog.address.endereco}, ${catalog.address.numero}`}</p>
              <p>{`${catalog.address.bairro}, ${catalog.address.cidade}, ${catalog.address.estado}`}</p>
            </div>
            }
            <button 
              className='text-blue-500 bg-transparent text-sm font-medium w-fit'
              onClick={() => setModalAddress(true)}  
            >{catalog.address.cep !== ''?'Alterar endereço':'Adicionar endereço'}</button>
            <div className='mt-10 w-full flex justify-center'>
              <LoadingButton text={'Salvar alterações'} loading={loading} full={false} handleSubmit={handleSubmit}/>
            </div>
        </div>

    </div>
  )
}
