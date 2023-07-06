import React, { useEffect } from 'react'
import Card from '@mercadopago/sdk-react/bricks/cardPayment'
import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';

export default function MyCardBlock() {

    useEffect(()=> {
        initMercadoPago('TEST-8baf6102-c707-4284-a248-a0ac11256c46', { locale: 'pt-BR' });
    }, [] )

  return (
    <Card
        initialization={{ 
            amount: 100
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
            const response = await axios.post('/mercado-pago/process_payment', param)
            console.log(response)
        }}
        />
  )
}
