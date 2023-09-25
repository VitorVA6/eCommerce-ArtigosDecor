import React, { useEffect } from 'react'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useCarrinhoContext } from '../contexts/Carrinho';
import { usePaymentContext } from '../contexts/Payment';
import { useNavigate } from 'react-router-dom';

export default function MyCardBlock() {

    const {carrinho, resetCart, total} = useCarrinhoContext()
    const {formikStep1, formikStep2, resetPayment} = usePaymentContext()
    const navigate = useNavigate()

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] )

  return (
    <div className='mt-3 -mx-[18px]'>
        <Payment
            initialization={{ 
                amount: total
            }}
            customization={{
                paymentMethods: {
                    bankTransfer: "all",
                    creditCard: "all",
                  },
                }}
            onSubmit={async ({ selectedPaymentMethod, formData }) => {
                try{
                    const {data} = await axios.post('/mercado-pago/process_payment', {
                        ...formData,
                        method: selectedPaymentMethod,
                        name: formikStep1.values.name,
                        cpf: formikStep1.values.cpf,
                        whats: formikStep1.values.whats,
                        endereco: `${formikStep2.values.endereco}, ${formikStep2.values.numero}, ${formikStep2.values.bairro}, ${formikStep2.values.cidade} - ${formikStep2.values.estado}`,
                        cep: formikStep2.values.cep,
                        subtotal: total,
                        delivery_rate: 0,
                        products: carrinho.map( el => {
                            return {
                                qty: el.quantidade,
                                name: el.title,
                                link: `${import.meta.env.VITE_MY_URL}produto/${el._id}`
                            }
                        } )
                    })
                    resetPayment()
                    resetCart()
                    navigate(`/payment-status/${data.id}`)
                }catch(err){
                    console.log(err)
                }
            }}
        />
    </div>
  )
}
