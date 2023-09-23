import React, { useEffect, useState } from 'react'
import BaseModal from './BaseModal'
import InputPayment from './InputPayment'
import { block2Schema } from '../schemas'
import masks from '../utils/masks'
import { useFormik } from 'formik';
import LoadingButton from './LoadingButton'
import { useCatalogContext } from '../contexts/Catalog'
import checkCEP from '../utils/checkCEP'

export default function ModalAddress({setModalAddress, notifySucess, notifyError}) {

    const {updateCatalog, catalog, getCatalog} = useCatalogContext()

    const addressForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            cep: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            complemento: ''
        },
        validationSchema: block2Schema,
        onSubmit: values =>{
            setLoading(true)
            updateCatalog(undefined, undefined, values).then(data => {
                setLoading(false)
                if(!!data.message){
                    getCatalog()
                    closeModal()
                    notifySucess(data.message)
                }
                else{
                    notifyError(data.error)
                }
            })
        }
    })

    const [loading, setLoading] = useState(false)
    const [animate, setAnimate] = useState(true)
    const [errorCEP, setErrorCEP] = useState('')

    function closeModal(){
        setAnimate(false)
        setTimeout(() => setModalAddress(false), 200) 
    }

    useEffect(() => {
        checkCEP(addressForm.values.cep).then(response => {        
            if(response.status === true){
                addressForm.setFieldValue('endereco', response.info?.logradouro)
                addressForm.setFieldValue('bairro', response.info?.bairro)
                addressForm.setFieldValue('cidade', response.info?.localidade)
                addressForm.setFieldValue('estado', response.info?.uf)
            }
            else{
                addressForm.setFieldValue('endereco', '')
                addressForm.setFieldValue('bairro', '')
                addressForm.setFieldValue('cidade', '')
                addressForm.setFieldValue('estado', '')
                setErrorCEP(response.errorAPI)
            }
        })  
    }, [addressForm.values.cep])

    useEffect(() => {
        if(catalog.address.cep !== ''){
            addressForm.setValues(catalog.address)
        }
    }, [])

  return (
    <BaseModal animate={animate} closeModal={closeModal} width={'lg:w-2/5'} top={'lg:top-20'}>
        <h2 className='text-center py-3 border-b w-full font-medium relative'>{'Endereço da loja'}</h2>
        <p className='text-gray-400 py-3 text-sm mb-1'>Digite abaixo o endereço de origem das entregas e/ou retirada</p>
        <form 
            className='flex flex-col gap-2 w-full px-6 mb-7'
        >
            <InputPayment
                placeholder={'CEP'}
                field={ addressForm.values.cep}
                setField = {(ev) => {
                    addressForm.setFieldValue('cep', masks.maskCEP(ev.target.value))
                }}
                id='cep'
                blur={addressForm.handleBlur}/>
            {
            addressForm.touched.cep && addressForm.errors.cep && <p className='text-red-500 text-xs -mt-2'>{`${addressForm.errors.cep}`}</p>
            }
            {
            errorCEP !== '' && <p className='text-red-500 text-xs -mt-2'>{`${errorCEP}`}</p>
            }
            <InputPayment
                placeholder={'Endereço'}
                field={ addressForm.values.endereco}
                setField = {addressForm.handleChange}
                id='endereco'
                blur={addressForm.handleBlur}/>
            {
            addressForm.touched.endereco && addressForm.errors.endereco && <p className='text-red-500 text-xs -mt-2'>{`${addressForm.errors.endereco}`}</p>
            }
            <div className='grid grid-cols-3 gap-3 w-full'>
                <div>
                <InputPayment
                    placeholder={'Número'}
                    field={ addressForm.values.numero}
                    setField = {addressForm.handleChange}
                    id='numero'
                    blur={addressForm.handleBlur}/>
                {
                addressForm.touched.numero && addressForm.errors.numero && <p className='text-red-500 text-xs'>{`${addressForm.errors.numero}`}</p>
                }
                </div>
                <div className=' col-span-2'>
                    <InputPayment
                        placeholder={'Bairro'}
                        field={ addressForm.values.bairro}
                        setField = {addressForm.handleChange}
                        id='bairro'
                        blur={addressForm.handleBlur}/>
                {
                addressForm.touched.bairro && addressForm.errors.bairro && <p className='text-red-500 text-xs'>{`${addressForm.errors.bairro}`}</p>
                }
                </div>
            </div>
            <div className='grid grid-cols-3 gap-3 w-full'>
                <div className=' col-span-2'>
                    <InputPayment
                        placeholder={'Cidade'}
                        field={ addressForm.values.cidade}
                        setField = {addressForm.handleChange}
                        id='cidade'
                        blur={addressForm.handleBlur}/>
                    {
                    addressForm.touched.cidade && addressForm.errors.cidade && <p className='text-red-500 text-xs'>{`${addressForm.errors.cidade}`}</p>
                    }
                </div>
                <div>
                    <InputPayment
                        placeholder={'Estado'}
                        field={ addressForm.values.estado}
                        setField = {addressForm.handleChange}
                        id='estado'
                        blur={addressForm.handleBlur}/>
                    {
                    addressForm.touched.estado && addressForm.errors.estado && <p className='text-red-500 text-xs'>{`${addressForm.errors.estado}`}</p>
                    }
                </div>
            </div>
            <InputPayment
                placeholder={'Complemento'}
                field={ addressForm.values.complemento}
                setField = {addressForm.handleChange}
                id='complemento'
                blur={addressForm.handleBlur}/>
            <div className='mt-4'>
                <LoadingButton 
                    loading={loading} 
                    text='Salvar alterações' 
                    full={true} 
                    handleSubmit={() => addressForm.handleSubmit()} 
                    bg_color='bg-blue-500'
                />
            </div>
        </form>
    </BaseModal>
  )
}