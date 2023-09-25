import React, { useEffect, useState } from 'react'
import { useCatalogContext } from '../contexts/Catalog'
import { usePaymentContext } from '../contexts/Payment'
import masks from '../utils/masks'

export default function ShipOption({name, time, price, freight, setFreight, myFreight, width, bg_color='border-l-color-primary'}) {

  const [priceAux, setPriceAux] = useState(0)
  const {catalog} = useCatalogContext()
  const {formikStep2} = usePaymentContext()

  function checkShipFree(price){
    if(catalog.shipFree.status === true){
        if(catalog.shipFree.validLocals === 'ALL'){
            return 0
        }
        else if(catalog.shipFree.validLocals === 'STATE' && formikStep2.values.estado === catalog.address.estado){
            return 0
        }
        else if(catalog.shipFree.validLocals === 'CITY' && formikStep2.values.cidade === catalog.address.cidade){
            return 0
        }
    }
    return price
  }

  function handleClick(){
    setFreight(
      {
          delivery: myFreight,
          price: priceAux
      })
  }

  useEffect(() => {
    setPriceAux(checkShipFree(price))
  }, [formikStep2.values.cidade])

  return (
    <div 
      className={`cursor-pointer flex text-gray-500 ${width} rounded-r-md justify-between items-center border-l-4 ${freight.delivery === myFreight ? `bg-color-custom-bg ${bg_color}` : 'bg-gray-100 border-l-gray-300'} px-5 py-2`}
      onClick={handleClick}
    >
        <div className='flex flex-col justify-center'>
            <h3 className='font-medium'>{name}</h3>
            <p className='text-sm -mt-0.5'>{time}</p>
        </div>
        <p className='text-sm font-medium'>{masks.maskCurrency(priceAux)}</p>
    </div>
  )
}