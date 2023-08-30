import React, { useEffect, useState } from 'react'
import BaseModal from './BaseModal'
import {FaRegTrashAlt} from 'react-icons/fa'
import {BsFillGeoAltFill} from 'react-icons/bs'
import InputPayment from './InputPayment'
import Select from 'react-select'
import LoadingButton from './LoadingButton'
import axios from 'axios'
import masks from '../utils/masks'
import {useCatalogContext} from '../contexts/Catalog'

export default function ModalShipCustom({setModalCustom, notifyError, notifySucess}) {

    const {catalog, setCatalog, updateCatalog} = useCatalogContext()

    const initialValue= 0
    const [loading, setLoading] = useState(false)
    const [animate, setAnimate] = useState(true)
    const [allCities, setAllCities] = useState([])

    const [cities, setCities] = useState([])

    const [selected, setSelected] = useState({value: '2910800', label: 'Feira de Santana'})
    const [valor, setValor] = useState(masks.maskCurrency(initialValue))

    function closeModal(){
        setAnimate(false)
        setTimeout(() => setModalCustom(false), 200)
    }

    function handleSubmit(){
        setLoading(true)
        updateCatalog().then(data => {
            setLoading(false)
            if(!!data.message){
                closeModal()
                notifySucess(data.message)
            }
            else{
                notifyError(data.error)
            }
        })
    }

    function removeCity(id){
        setCatalog(prev => (
            {...prev, shipCustom: 
                {
                    ...prev.shipCustom, 
                    cities: prev.shipCustom.cities.filter(el => el.city.value !== id)
                }
        }))

        setCities( cities.filter(el => el.city.value !== id) )
    }

    function addCity(){
        const cityExist = catalog.shipCustom.cities.find(el => el.city.value === selected.value)
        if(cityExist) return
        setCatalog(prev => (
            {...prev, shipCustom: 
                {
                    ...prev.shipCustom, 
                    cities: [...prev.shipCustom.cities, {price: valor, city: selected}]
                }
        }))
    }

    /* useEffect(() => {
        console.log(catalog.shipCustom)
    }, [catalog.shipCustom]) */

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/BA/municipios').then(({data}) => {
            setAllCities(data.map(el => ({value: el.id, label: el.nome})))
        })
    }, [])

  return (
    <BaseModal animate={animate} closeModal={closeModal} width={'lg:w-2/5'} top={'lg:top-10'}>
        <h2 className='text-center py-3 border-b w-full font-medium relative border-gray-300'>Frete customizado</h2>
        <div className='flex flex-col pt-5 pb-6 px-7 w-full'>
            <h3 className='text-[15px] font-medium'>Locais de entrega</h3>
            <p className='text-gray-500/80 text-sm mb-2'>Adicione cidades e defina a taxa de entrega para as mesmas.</p>
            <div className='flex flex-col h-36 w-full overflow-y-auto py-2 gap-2'>
                {
                    catalog.shipCustom.cities.length === 0 ?
                    <div className='flex w-full h-full justify-center items-center gap-3'>
                        <BsFillGeoAltFill className='text-gray-300 w-8 h-8'/>
                        <p className='text-gray-300 py-5'>Ainda não há cidades adicionadas</p>
                    </div>:
                    <>
                    {catalog.shipCustom.cities.map(el => (
                        <div key={el.city.value} className='flex justify-between items-center py-2 rounded-lg border px-4'>
                            <div className='flex flex-col justify-center text-[13px]'>
                                <h3 className='font-medium -mb-1'>{el.city.label}</h3>
                                <h4 className='text-gray-400'>{masks.maskCurrency(el.price)}</h4>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <button className='text-[13px] text-blue-500 bg-transparent font-medium'>Editar</button>
                                <FaRegTrashAlt 
                                    className='text-gray-400 w-4 h-4 cursor-pointer'
                                    onClick={() => removeCity(el.city.value)}
                                />
                            </div>
                        </div>
                    ))}
                    </>
                }
            </div>
            <h3 className='text-[15px] font-medium'>Nome da entrega</h3>
            <p className='text-gray-500/80 text-sm mb-2 leading-4'>Nome que irá aparecer para o cliente, por exemplo: “Motoboy”.</p>
            <InputPayment 
                placeholder='Ex: Motoboy' 
                field={catalog.shipCustom.deliveryName} 
                setField={(ev) => 
                    setCatalog(prev => ({...prev, shipCustom: {...prev.shipCustom, deliveryName: ev.target.value}}))
                }
                id='name-ship' 
                blur={()=>{}} width='w-full'
            />
            <h3 className='text-[15px] font-medium mt-5'>Adicionar cidade</h3>
            <p className='text-gray-500/80 text-sm mb-5 leading-4'>Em quais cidades essas opção de entrega deverá ser ofertada?</p>
            <div className='w-full rounded-md border px-4 pt-2 pb-3 flex flex-col gap-1 mb-4'>
                <h3 className='text-[13px] font-medium flex items-center'>Nome da cidade <span className='text-blue-500 ml-1.5 font-normal'>Obrigatório</span></h3>
                <Select 
                    className='text-sm'
                    options={allCities}
                    value={selected}
                    onChange={setSelected}
                />
                <h3 className='text-[13px] font-medium mt-1 flex items-center'>Preço <span className='text-blue-500 ml-1.5 font-normal'>Obrigatório</span></h3>
                <div className='flex w-full justify-between items-center'>
                    <InputPayment
                        placeholder='' 
                        field={valor} 
                        setField={(ev) => setValor(masks.maskCurrency(ev.target.value))}
                        id='name-ship' 
                        blur={()=>{}} width='w-1/3'
                    />
                    <button 
                        className='rounded-md w-fit text-blue-500 bg-white px-12 text-sm py-2.5 font-medium border border-blue-500'
                        onClick={() => addCity()}    
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            <LoadingButton
                loading={loading} 
                text='Salvar alterações' 
                full={true} 
                handleSubmit={() => handleSubmit()}/>
        </div>
    </BaseModal>
  )
}
