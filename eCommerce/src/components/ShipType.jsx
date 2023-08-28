import React from 'react'
import MUISwitch from './Switch'

export default function ShipType({title, status, setStatus}) {
  return (
    <div className='flex justify-between items-center p-3 rounded-lg border w-full cursor-pointer'>
        <div className='flex flex-col'>
            <h3 className='text-sm text-black/90 font-medium'>{title}</h3>
            <h3 className='text-xs text-gray-400'>{status ? 'Ativado' : 'Desativado'}</h3>
        </div>
        <div className='flex gap-2 items-center'>
            <button className='text-blue-500 bg-transparent text-sm font-medium'>Editar</button>
            <MUISwitch />
        </div>
    </div>
  )
}
