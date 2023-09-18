import React, { useEffect } from 'react'
import { usePaymentContext } from '../contexts/Payment'

export default function Requests({setSelected}) {

  const { getPayments, payments, setPaymentId } = usePaymentContext()

  useEffect( () => {
    getPayments()
  }, [] )

  function dataConversor(data){
    const dataObj = new Date(data);
    const options = { month: "long" };
    const mesExtenso = new Intl.DateTimeFormat("pt-BR", options).format(dataObj);
    const horaFormatada = `${dataObj.getHours()}:${dataObj.getMinutes().toString().padStart(2, "0")}h`;
    const formatoDesejado = `${dataObj.getDate()} de ${mesExtenso} de ${dataObj.getFullYear()} às ${horaFormatada}`;
    return formatoDesejado
  }

  return (
    <section className='flex items-center flex-col w-full h-screen'>
      <div className='flex flex-col w-full lg:w-3/4 bg-white py-8 rounded-2xl border border-gray-300/80 lg:border-gray-200/70'>
        <div className='flex flex-col border-b px-4 lg:px-7'>
            <h2 className='font-medium text-[22px]'>Pedidos recebidos</h2>
            <p className='text-gray-400 text-sm -mt-0.5 mb-3'>Aqui são exibidos seus pedidos recebidos</p>
            <button className='bg-transparent text-color-primary text-[15px] font-medium w-fit mb-4'>+ Adicionar pedido</button>
        </div>
        {
          payments.map( element =>(
            <div 
              className='flex w-full border-b px-4 lg:px-7 py-5 justify-between'
              key={element._id}
            >
                <div className='flex flex-col gap-1 w-fit'>
                    <div className='flex gap-2 items-center'>
                        <h3 className='text-sm text-gray-500'>{element.name}</h3>
                        <h3 className='text-gray-400 text-xs mt-[1px]'>{element.transaction_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </div>
                    <p className='text-xs text-gray-400'>{dataConversor(element.date_created)}</p>
                </div>
                <button 
                  className='text-[12.5px] flex items-center font-medium py-2 text-white bg-color-primary px-3.5 rounded-lg w-fit'
                  onClick={() => {
                    setPaymentId(element._id)
                    setSelected('order-id')
                  }}
                >Ver detalhes</button>
            </div>    
          ) )
        }
      </div>  
    </section>
  )
}
