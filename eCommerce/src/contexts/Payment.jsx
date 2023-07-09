import { createContext, useContext, useState } from "react";
import { useFormik } from 'formik';
import { block1Schema, block2Schema } from '../schemas';
import checkCEP from '../utils/checkCEP';
import checkComplete from '../utils/checkComplete';

export const PaymentContext = createContext()

export default function PaymentProvider ( {children} ){

    const [validCEP, setValidCEP] = useState(false)
    const [errorCEP, setErrorCEP] = useState('')
    const [changeBlock, setChangeBlock] = useState('1')
    const [block1, setBlock1] = useState({selected:true, completed:false, disabled: false})
    const [block2, setBlock2] = useState({selected:false, completed:false, disabled: false})
    const [block3, setBlock3] = useState({selected:false, completed:false, disabled: true})
    const formikStep1 = useFormik({
        enableReinitialize: true,
        initialValues: {
          name: '',
          cpf: '',
          whats: ''
        },
        validationSchema: block1Schema,
        onSubmit: values =>{
            if(block2.completed === false){
                setChangeBlock('2')
            }else{
                setChangeBlock('3')
            }
        }
      })
    const formikStep2 = useFormik({
        enableReinitialize: true,
        initialValues: {
            cep: '',
            endereco: '',
            numero: '',
            bairro: '',
            complemento: ''
        },
        validationSchema: block2Schema,
        onSubmit: values =>{
            if(block1.completed === false){
                setChangeBlock('1')
            }else{
                setChangeBlock('3')
            }
        }
    })

    return (
        <PaymentContext.Provider 
            value={{
                formikStep1, formikStep2, validCEP, setValidCEP, errorCEP, setErrorCEP, changeBlock, setChangeBlock,
                block1, setBlock1, block2, setBlock2, block3, setBlock3
            }}>
            {children}
        </PaymentContext.Provider>
    )
}

export function usePaymentContext(){
    const {
        formikStep1, formikStep2, validCEP, setValidCEP, errorCEP, setErrorCEP, changeBlock, setChangeBlock,
        block1, setBlock1, block2, setBlock2, block3, setBlock3
    } = useContext(PaymentContext)

    function cepIsValid(){
        checkCEP(formikStep2.values.cep).then(response => {        
            if(response.status === true){
                formikStep2.setFieldValue('endereco', response.info?.logradouro)
                formikStep2.setFieldValue('bairro', response.info?.bairro)
                setValidCEP(true)
            }
            else{
                formikStep2.setFieldValue('endereco', '')
                formikStep2.setFieldValue('bairro', '')
                setErrorCEP(response.errorAPI)
                setValidCEP(false)
            }
        })     
    }

    function blockManager(){
        if(changeBlock === '1'){
            setBlock1(prev => ({...prev, selected: true, completed: false}))
            setBlock2(prev => ({...prev, selected: false, completed: checkComplete(formikStep2.errors, formikStep2.values)}))
            setBlock3(prev => ({...prev, selected: false, disabled: true}))
        }
        else if(changeBlock === '2'){
            setBlock1(prev => ({...prev, selected: false, completed: checkComplete(formikStep1.errors, formikStep1.values)}))
            setBlock2(prev => ({...prev, selected: true, completed: false}))
            setBlock3(prev => ({...prev, selected: false, disabled: true}))
        }
        else if(changeBlock === '3'){
            setBlock1(prev => ({...prev, selected: false, completed: true}))
            setBlock2(prev => ({...prev, selected: false, completed: true}))
            setBlock3(prev => ({...prev, selected: true, completed: false, disabled: false}))
        }
    }

    return {
        formikStep1,
        formikStep2,
        validCEP, 
        errorCEP,
        changeBlock,
        block1,
        block2,
        block3,
        setChangeBlock,
        cepIsValid,
        blockManager
    }
}