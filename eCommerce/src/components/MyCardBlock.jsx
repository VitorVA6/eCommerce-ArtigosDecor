import React, { useEffect } from 'react'
import Card from '@mercadopago/sdk-react/bricks/cardPayment'
import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useCarrinhoContext } from '../contexts/Carrinho';
import { usePaymentContext } from '../contexts/Payment';
import { useNavigate } from 'react-router-dom';

export default function MyCardBlock() {

    const {carrinho, total} = useCarrinhoContext()
    const {formikStep1, formikStep2} = usePaymentContext()
    const navigate = useNavigate()

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] )

  return (
    <div className='mt-3 -mx-[18px]'>
        <Card
            initialization={{ 
                amount: total
            }}
            customization={{
                visual: {
                    texts: {
                        formTitle: "",
                        emailSectionTitle: "Receba a confirmação",
                        installmentsSectionTitle: "",
                        cardholderName: {
                            label: "",
                            placeholder: "",
                        },
                        email: {
                            label: "",
                            placeholder: "",
                        },
                        cardholderIdentification: {
                            label: "",
                        },
                        cardNumber: {
                            label: "",
                        },
                        expirationDate: {
                            label: "",
                        },
                        securityCode: {
                            label: "",
                        },
                        selectInstallments: "",
                        selectIssuerBank: "",
                        formSubmit: "",
                    }
                }}}
            onSubmit={async (param) => {
                try{
                    const {data} = await axios.post('/mercado-pago/process_payment', {
                        ...param,
                        name: formikStep1.values.name,
                        cpf: formikStep1.values.cpf,
                        whats: formikStep1.values.whats,
                        endereco: `${formikStep2.values.endereco}, ${formikStep2.values.numero}, ${formikStep2.values.bairro}`,
                        cep: formikStep2.values.cep,
                        subtotal: total,
                        delivery_rate: 0,
                        products: carrinho.map( el => {
                            return {
                                qty: el.quantidade,
                                name: el.title 
                            }
                        } )
                    })
                    navigate(`/payment-status/${data.id}`)
                }catch(err){
                    console.log(err)
                }
            }}
        />
    </div>
  )
}
