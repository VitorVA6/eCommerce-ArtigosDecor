import React, { useEffect, useState } from 'react'
import {BsChevronLeft} from 'react-icons/bs'
import { usePaymentContext } from '../contexts/Payment' 
import {FiPackage} from 'react-icons/fi'
import {BsWhatsapp} from 'react-icons/bs'
import {RiCloseCircleLine} from 'react-icons/ri'
import notifies from '../utils/toastNotifies'

export default function ({setSelected}) {

    const {getPaymentById, calcelPayment, notifyShipment} = usePaymentContext()
    const [payment, setPayment] = useState()

    useEffect(() => {
        getPaymentById()
        .then(data => {
            setPayment(data)
        })
    }, [])

    function classManager(){
      if(payment?.status === 'approved'){
        return 'bg-green-50'
      }else if(payment?.status === 'pending' || payment?.status === 'in_process'){
        return 'bg-gray-50'
      }else if(payment?.status === 'cancelled' || payment?.status === 'rejected'){
        return 'bg-red-50'
      }else if(payment?.status === 'refunded' || payment?.status === 'charged_back'){
        return 'bg-purple-50'
      }else if(payment?.status === 'in_mediation'){
        return 'bg-yellow-50'
      }else if(payment?.status === 'authorized'){
        return 'bg-blue-50'
      }
    }

    function statusManager(){
      if(payment?.status === 'approved'){
        return (
          <>
            <p>Status: Pagamento aprovado</p>
            <p>Descrição: O pagamento foi aprovado e creditado.</p>
          </>
          )
      }
      else if(payment?.status === 'pending'){
        return (
          <>
            <p>Status: Pagamento pendente</p>
            <p>Descrição: O cliente não concluiu o processo de pagamento.</p>
          </>
          )
      }
      else if(payment?.status === 'authorized'){
        return (
          <>
            <p>Status: Pagamento autorizado</p>
            <p>Descrição: O pagamento foi autorizado, mas ainda não foi capturado.</p>
          </>
          )
      }
      else if(payment?.status === 'in_process'){
        return (
          <>
            <p>Status: Pagamento em processo</p>
            <p>Descrição: O pagamento está em análise.</p>
          </>
          )
      }
      else if(payment?.status === 'in_mediation'){
        return (
          <>
            <p>Status: Pagamento em mediação</p>
            <p>Descrição: O usuário iniciou uma disputa.</p>
          </>
          )
      }
      else if(payment?.status === 'cancelled'){
        return (
          <>
            <p>Status: Pagamento cancelado</p>
            <p>Descrição: O pagamento foi cancelado por uma das duas partes.</p>
          </>
          )
      }
      else if(payment?.status === 'rejected'){
        return (
          <>
            <p>Status: Pagamento rejeitado</p>
            <p>Descrição: O pagamento foi rejeitado, o usuário pode tentar pagar novamente.</p>
          </>
          )
      }
      else if(payment?.status === 'refunded'){
        return (
          <>
            <p>Status: Pagamento estornado</p>
            <p>Descrição: O pagamento foi estornado ao cliente.</p>
          </>
          )
      }
      else if(payment?.status === 'charged_back'){
        return (
          <>
            <p>Status: Pagamento estornado por crédito</p>
            <p>Descrição: O pagamento foi estornado no formato de crédito no cartão do cliente.</p>
          </>
          )
      }
      
    }

    function cancelOrder(){
      if(payment?.status !== 'cancelled'){
        calcelPayment().then(data =>{
          if(!!data.message){
            setPayment( prev => ({...prev, status: 'cancelled'}) )
            notifies.sucess(data.message)
          }
          else{
            notifies.error(data.error)
          }
        })
      }
    }

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
      <notifies.Container />
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
        <div className='flex flex-col px-4 lg:px-7 py-7 border-b-4 border-gray-100/80 gap-4'>
            <div className='flex flex-col gap-2'>
                <h3 className=' uppercase text-sm'>#{payment?._id}</h3>
                <p className='text-xs text-gray-500/90'>{!!payment && dataConversor(payment?.date_created)}</p>
            </div>
            <p className='font-medium text-sm border-l-4 border-color-primary pl-2 mb-2 mt-1'>{
                payment?.payment_type_id === 'credit_card' ?
                'Pagamento com cartão de crédito':
                'Pagamento no PIX'
              }</p>
            <div className={`flex flex-col ${classManager()} px-3 h-fit py-2 rounded-lg text-[13px] gap-2`}>{
              statusManager()
            }</div>
        </div>
        <div className='flex flex-col px-4 lg:px-7 py-7 border-b-4 border-gray-50 gap-2'>
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
                  payment.products.map((el, index) => (
                    <h3 key={index} className='text-gray-500/90 text-sm'>{`${el.qty} x ${el.name}`}</h3>
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
            <button 
              className='mb-6 flex justify-center font-medium items-center w-full py-4 text-color-primary bg-blue-50 text-sm rounded-lg relative'
              onClick={() => notifyShipment(payment.name, payment.products, payment.endereco, payment.cep).then(data => console.log(data))}
            >
              Notificar envio do pedido 
              <FiPackage className= 'absolute right-4 top-4 w-[21px] h-[21px]'/>
            </button>
            <h3 className='font-medium text-[15px] mb-4'>Opções</h3>
            <button className='flex justify-center font-medium items-center w-full py-4 bg-gray-100 text-sm rounded-lg relative mb-3'>
              Chamar no Whatsapp 
              <BsWhatsapp className='absolute right-[17px] top-4 w-[18px] h-[18px]'/>
            </button>
            <button 
              className={`flex justify-center font-medium items-center w-full py-4 text-red-500 bg-red-50 text-sm rounded-lg relative mb-3 ${payment?.status === 'cancelled' && 'opacity-40 cursor-auto'}`}
              onClick={cancelOrder}
            >
              {payment?.status === 'cancelled'?'Pedido cancelado':'Cancelar pedido' }
              <RiCloseCircleLine className='absolute right-4 top-[15px] w-[22px] h-[22px]'/>
            </button>
        </div>
      </div>  
    </section>
  )
}
