import React, { useEffect } from 'react'
import Switch from '@mui/material/Switch'

export default function ShipType({title, status, setStatus, setModal}) {


  return (
    <div className='flex justify-between items-center p-3 rounded-lg border w-full'>
        <div className='flex flex-col'>
            <h3 className='text-sm text-black/90 font-medium'>{title}</h3>
            <h3 className='text-xs text-gray-400'>{status ? 'Ativado' : 'Desativado'}</h3>
        </div>
        <div className='flex gap-2 items-center'>
            <button 
              className='text-color-primary bg-transparent text-sm font-medium'
              onClick={() => setModal(true)}  
            >Editar</button>
            <Switch checked={status} onChange={setStatus}/>
        </div>
    </div>
  )
}
