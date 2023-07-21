import React, { useEffect, useState } from 'react'
import {BsChevronLeft} from 'react-icons/bs'
import { usePaymentContext } from '../contexts/Payment'
import {FiPackage} from 'react-icons/fi'
import {BsWhatsapp} from 'react-icons/bs'
import {RiCloseCircleLine} from 'react-icons/ri'

export default function ({setSelected}) {

    const {getPaymentById} = usePaymentContext()
    const [payment, setPayment] = useState()

    useEffect(() => {
        getPaymentById()
        .then(data => {
            setPayment(data)
        })
    }, [])

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
      <div className='flex flex-col w-full lg:w-3/4 bg-white rounded-2xl border border-gray-300 lg:border-gray-200/70'>
        <div className='flex border-b items-center relative h-16'>
            <div 
              className='flex justify-center items-center px-7 cursor-pointer h-16 absolute left-0 top-0'
              onClick={() => setSelected('req')}  
            >
                <BsChevronLeft className='w-5 h-5'/>
            </div>
            <h2 className='font-medium text-[17px] text-center w-full'>Pedidos recebidos</h2>           
        </div>
        <div className='flex justify-between px-4 lg:px-7 py-7 border-b-4 border-gray-100/80'>
            <div className='flex flex-col gap-2'>
                <h3 className=' uppercase text-sm'>#{payment?._id}</h3>
                <p className='text-xs text-gray-500/90'>{!!payment && dataConversor(payment?.date_approved)}</p>
            </div>
            <div className='flex bg-blue-50 px-3 h-fit py-2 text-blue-500 rounded-lg text-[13px] items-center'>{
              payment?.status === 'approved' ? 'Pago com Mercado Pago' : 'Pagamento cancelado'
            }</div>
        </div>
        <div className='flex flex-col px-4 lg:px-7 py-7 border-b-4 border-gray-50  gap-2'>
            <div className='flex justify-between text-[13px]'>
              <p className='text-gray-500/90'>Subtotal</p>
              <p className=''>{payment?.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <div className='flex justify-between text-[13px]'>
              <p className='text-gray-500/90'>Taxa de entrega</p>
              <p className=''>{payment?.delivery_rate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <div className='flex justify-between text-[15px] font-medium'>
              <p className=''>Total</p>
              <p className=''>{payment?.transaction_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
        </div>
        {
        payment?.products.length > 0 &&
        <div className='flex flex-col gap-2 px-4 lg:px-7 py-7 border-b-4 border-gray-100/80'>
            <h3 className='font-medium text-[15px]'>Produtos</h3>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                {
                  payment.products.map(el => (
                    <h3 className='text-gray-300 text-sm'>{`${el.qty} x ${el.name}`}</h3>
                  ))
                }
              </div>
            </div>
        </div>
        }
        <div className='flex flex-col gap-2 px-4 lg:px-7 py-7 border-b-4 border-gray-100/80'>
            <h3 className='font-medium text-[15px]'>Dados do comprador</h3>
            <div className='flex flex-col gap-1 text-gray-500/90 text-sm'>
              <h3>{payment?.name}</h3>
              <h3>{payment?.whats}</h3>
              <h3>{payment?.email}</h3>
              <h3>{payment?.cpf}</h3>
            </div>
        </div>
        <div className='flex flex-col gap-2 px-4 lg:px-7 py-7 border-b-4 border-gray-100/80'>
            <h3 className='font-medium text-[15px]'>Endereço</h3>
            <div className='flex flex-col gap-1 text-gray-500/90 text-sm'>
              <h3>{payment?.endereco}</h3>
              <h3>{payment?.cep}</h3>
            </div>
        </div>
        <div className='flex flex-col px-4 lg:px-7 py-7 border-b-4 border-gray-100/80'>
            <h3 className='font-medium text-[15px] mb-4'>Acompanhamento do cliente</h3>
            <button className='mb-6 flex justify-center font-medium items-center w-full py-4 text-blue-500 bg-blue-50 text-sm rounded-lg relative'>
              Notificar envio do pedido 
              <FiPackage className= 'absolute right-4 top-4 w-[21px] h-[21px]'/>
            </button>
            <h3 className='font-medium text-[15px] mb-4'>Opções</h3>
            <button className='flex justify-center font-medium items-center w-full py-4 bg-gray-100 text-sm rounded-lg relative mb-3'>
              Chamar no Whatsapp 
              <BsWhatsapp className='absolute right-[17px] top-4 w-[18px] h-[18px]'/>
            </button>
            <button className='flex justify-center font-medium items-center w-full py-4 text-red-500 bg-red-50 text-sm rounded-lg relative mb-3'>
              Cancelar pedido
              <RiCloseCircleLine className='absolute right-4 top-[15px] w-[22px] h-[22px]'/>
            </button>
        </div>
      </div>  
    </section>
  )
}
