import React, { useState } from 'react'
import ShipType from './ShipType'
import SelectAdmin from './SelectAdmin'

export default function ShipmentAdmin() {

  const shipOptions = {
    pickup: 'PICKUP',
    delivery: 'DELIVERY',
    both: 'BOTH'
}
  
  const [statusFree, setStatusFree] = useState(false)
  const [statusCustom, setStatusCustom] = useState(false)
  const [statusCorreios, setStatusCorreios] = useState(false)
  const [shipOption, setShipOption] = useState(shipOptions.delivery)

  return (
    <div className='flex items-center flex-col w-full h-screen'>
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
                setOption={setShipOption} 
                option={shipOptions.delivery} 
                text='Somente entrega' 
                shipOption={shipOption}/>
              <SelectAdmin 
                setOption={setShipOption} 
                option={shipOptions.pickup} 
                text='Somente retirada no local'
                shipOption={shipOption}/>
              <SelectAdmin 
                setOption={setShipOption} 
                option={shipOptions.both} 
                text='Entrega e retirada no local'
                shipOption={shipOption}/>
            </div>
            <h1 className='text-black/90 font-medium'>Endereço da loja</h1>
            <p className='text-gray-500/80 text-sm mb-3'>Endereço de origem das entregas e/ou retirada</p>
            <button className='text-blue-500 bg-transparent text-sm font-medium w-fit'>Adicionar endereço</button>
        </div>
    </div>
  )
}
