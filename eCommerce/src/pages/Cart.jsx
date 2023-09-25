import React, {  useEffect } from 'react'
import {useCarrinhoContext} from '../contexts/Carrinho'
import {Link} from 'react-router-dom'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {FiChevronRight} from 'react-icons/fi'
import { useVariationContext } from '../contexts/Variation'
import bagImg from '../images/bolsa-de-compras.png'
import InputPayment from '../components/InputPayment'
import { usePaymentContext } from '../contexts/Payment'
import masks from '../utils/masks'
import { useCatalogContext } from '../contexts/Catalog'
import ShipOption from '../components/ShipOption'
import SEO from '../components/SEO'

export default function Cart() {
    const {carrinho, listaCarrinho, removeCarrinho, alteraQuantidade, total, freight, setFreight, deliveryOptions} = useCarrinhoContext()
    const {variations, getVariations} = useVariationContext()
    const {formikStep2, validCEP, errorCEP, cepIsValid} = usePaymentContext()
    const {catalog} = useCatalogContext()

    useEffect(() => {
        getVariations()
        listaCarrinho()
    }, []);

    useEffect(() => {
        cepIsValid()
    }, [formikStep2.values.cep])

    

    function handleCustomShip(){
        const city = catalog.shipCustom.cities.find(el => el.city.label === formikStep2.values.cidade)
        if(catalog.shipCustom.status === true && !!city){
            return (
            <ShipOption
                name = {catalog.shipCustom.deliveryName} 
                time = '1 a 2 dias'
                price = {city.price}
                freight={freight}
                setFreight={setFreight}
                myFreight = {deliveryOptions.custom}
                width='w-full md:w-3/5'
            />
            )
        }
    }

    function handleCorreiosShip(){
        if(catalog.shipCorreios.status === true){
            if(catalog.shipCorreios.sedex === true){
                return (
                    <>
                        <ShipOption 
                            name='Correios - PAC' 
                            time='9 a 12 dias' 
                            price={24.5}
                            freight={freight}
                            setFreight={setFreight}
                            myFreight = {deliveryOptions.pac}
                            width='w-full md:w-3/5'
                        />
                        <ShipOption 
                            name='Correios - Sedex' 
                            time='7 a 10 dias' 
                            price={29.5}
                            freight={freight}
                            setFreight={setFreight}
                            myFreight = {deliveryOptions.sedex}
                            width='w-full md:w-3/5'
                        />
                    </>
                )
            }
            return <ShipOption 
                name='Correios - PAC' 
                time='9 a 12 dias' 
                price={masks.maskCurrency(checkShipFree(24.5))}
                freight={freight}
                setFreight={setFreight}
                myFreight = {deliveryOptions.pac}
                width='w-full md:w-3/5'
            />
        }
    }

    function fillVarAndOptions(element){
        let description = ''
        const comb = element.combinations.find(el => el.id === element.combinationId)
        comb.combination.forEach(element => {
            for(let i=0; i<variations.length;i++){
                const option = variations[i].options.find(el => el.value === element)
                if(!!option){
                    description += `${variations[i].name}: ${option.label}${i !== (comb.combination.length-1)?' // ':''}`
                    break
                }
            }
        });
        return description
    }

  return (
    <>
    <SEO
        title='Seu Carrinho de Compras'
        description={`Aqui é armazenada a lista de produtos que você deseja comprar`}
        url = 'https://artigosdecor.render.com/cart'
        canonical = 'https://artigosdecor.render.com/cart'
        keywords = 'carrinho, cart'
    />
    <section className=' px-3 md:px-10 xl:px-32 pb-20 md:pt-16 -mb-16'>
        <div className = 'grid lg:grid-cols-12 xl:grid-cols-7 gap-6'>
            <div className={`h-fit flex flex-col lg:col-span-8 xl:col-span-5 w-full ${carrinho.length > 0 && 'bg-white rounded-md shadow-md shadow-gray-400/60'}`}>
                              
                { carrinho.length > 0 ?
                    <>
                    <div className='flex md:grid grid-cols-5 xl:grid-cols-6 text-gray-500/80 py-4 font-medium border-b px-4 md:px-6'>
                        <h3 className='md:hidden text-black/90'>Produtos</h3>
                        <h3 className='hidden md:block col-span-3'>PRODUTO</h3>
                        <h3 className='col-span-1 hidden xl:block'>PREÇO</h3>
                        <h3 className='col-span-1 pl-[16%] hidden md:block'>QTD</h3>
                        <h3 className='hidden md:block col-span-1'>TOTAL</h3>
                    </div>  
                    {carrinho.map( (elemento, index) => (
                    <div key={elemento?._id} 
                        className={`flex md:grid md:grid-cols-5 xl:grid-cols-6 py-5 px-4 md:px-6 md:items-center ${index<(carrinho.length-1)&&'border-b border-gray-300'}`}>
                        <div className='flex gap-5 col-span-3'>
                            <img src={`${import.meta.env.VITE_AWS_URL}${elemento?.img[0]}`} alt="Imagem do produto" className='rounded-sm w-20 h-20 md:w-[72px] md:h-[72px] lg:w-20 lg:h-20 xl:w-24 xl:h-24'/>
                            <div className='flex flex-col md:justify-center'>    
                                <p className='md:font-medium text-black/80 text-sm md:text-base w-full'>{elemento?.title}</p>
                                <p className='hidden md:block text-xs font-medium text-gray-500/80'>{`#${elemento?._id}`}</p>
                                {
                                    elemento?.combinations?.length > 0 &&
                                    <p className='text-xs font-medium text-gray-500/80'>{`${fillVarAndOptions(elemento)}`}</p>
                                }
                                <p className='font-bold text-black/80 md:hidden'>{(elemento?.desconto>0?elemento?.desconto:elemento?.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <div className='flex items-center md:hidden gap-[60px] text-sm mt-3'>                                    
                                    <div className='flex rounded-md items-center h-7 border border-gray-300 '>
                                        <div className='w-8 justify-center h-full flex items-center'>
                                            <AiOutlineMinus
                                                className='w-4 h-3 cursor-pointer text-color-primary'
                                                onClick={()=>alteraQuantidade(elemento?._id, '-')}
                                            />
                                        </div>
                                        <p className='text-center text-[13px] px-1 font-medium flex items-center h-full text-black/90'>{elemento?.quantidade}</p>
                                        <div className='w-8 justify-center h-full flex items-center'>
                                            <AiOutlinePlus
                                                className='w-4 h-3 cursor-pointer text-color-primary'
                                                onClick={()=>alteraQuantidade(elemento?._id, '+')}
                                            />
                                        </div>
                                    </div> 
                                    <button 
                                        className='text-color-primary text-xs font-medium'
                                        onClick={() => removeCarrinho(elemento._id)}     
                                    >
                                        Excluir
                                    </button>     
                                </div>                
                            </div>
                        </div>
                        <p className='font-medium text-lg text-black/80 hidden xl:block'>{(elemento?.desconto>0?elemento?.desconto:elemento?.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div className='items-center text-black/80 font-medium gap-4 hidden md:flex xl:text-lg'>
                            <AiOutlineMinus
                                className='lg:w-3 lg:h-3.5 xl:w-4 xl:h-4 text-black/80 cursor-pointer'
                                onClick={()=>alteraQuantidade(elemento?._id, '-')}
                            />
                            <p className='text-center'>{elemento?.quantidade}</p>
                            <AiOutlinePlus
                                className='lg:w-3 lg:h-3.5 xl:w-4 xl:h-4 text-black/80 cursor-pointer'
                                onClick={()=>alteraQuantidade(elemento?._id, '+')}
                            />
                        </div>
                        <div className='hidden md:flex justify-between items-center w-full'>
                            <p className='font-medium xl:text-lg text-black/80'>{((elemento?.desconto>0?elemento?.desconto:elemento?.preco)*elemento?.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <IoMdClose 
                                className='w-5 h-5 text-black/80 cursor-pointer m-1' 
                                onClick={() => removeCarrinho(elemento._id)} 
                            />
                        </div>
                    </div>
                ) )}
                
                <div className='flex w-full flex-col px-4 md:px-6 border-t py-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-black-80 text-[18px] font-mdium'>
                            Frete
                        </h2>
                        {
                            (catalog.shipCustom.status === false || catalog.shipCorreios.status === false) &&
                            <p>Grátis</p>
                        }
                    </div>
                    {
                    (catalog.shipCustom.status === true || catalog.shipCorreios.status === true) &&
                    <div className='mt-3'>
                        <div className='grid grid-cols-2 items-center gap-10'>
                            <div className='flex flex-col'>
                                <InputPayment
                                    title={'Informe seu CEP'}
                                    placeholder={'99999-999'}
                                    field={ formikStep2.values.cep}
                                    setField = {(ev) => {
                                    formikStep2.setFieldValue('cep', masks.maskCEP(ev.target.value))
                                }}
                                id='cep'
                                blur={formikStep2.handleBlur}
                                />
                                {
                                formikStep2.touched.cep && formikStep2.errors.cep && <p className='text-red-500 text-xs ml-1 mt-0.5'>{`${formikStep2.errors.cep}`}</p>
                                }
                                {
                                errorCEP !== '' && <p className='text-red-500 text-xs  ml-1 mt-0.5'>{`${errorCEP}`}</p>
                                }
                            </div>
                            {
                            validCEP && 
                                <div className='flex flex-col'>
                                    <h3 className='font-medium text-gray-500 mt-1'>
                                        {formikStep2.values.cidade} - {formikStep2.values.estado}
                                    </h3>
                                    {
                                        formikStep2.values.endereco !== '' &&
                                        <p className='text-gray-500 -mt-1'>{formikStep2.values.endereco}</p>
                                    }
                                </div>
                            }
                        </div>
                        {
                        validCEP && 
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-medium text-gray-500 text-[15px] mt-4 mb-2'>
                                Selecione uma forma de envio:
                            </h3>
                            {
                            handleCustomShip()
                            }
                            {
                            handleCorreiosShip()
                            }
                        </div>
                        }
                    </div> 
                    }
                </div>
                </>: 
                <div className='flex flex-col px-8 pt-24 pb-8 md:py-28 h-fit items-center justify-center md:bg-gray-50 rounded-md md:shadow-md md:shadow-gray-400/60'>
                    <img src={bagImg} alt='' className='w-20 h-20 mb-4'/>
                    <h1 className='my-2 font-medium text-base md:text-[20px] text-black/80 text-center'>Seu carrinho de compras se encontra vazio!</h1>
                    <h2 className='mb-4 text-black/50 text-sm md:text-[18px] text-center'>Não perca tempo e preencha-o com lindos artigos de decoração.</h2>
                    <Link 
                        to={'/'} 
                        className='flex justify-center w-fit px-8 md:px-12 md:py-3 py-2.5 border text-white bg-color-secundary font-medium mt-3 rounded-md'>
                            Continuar comprando
                    </Link>
                </div>}            
                
                
            </div>
            <div className={`w-full h-fit ${carrinho.length > 0 ? 'bg-white':'bg-gray-50 hidden md:block'} pt-5 pb-6 rounded-md lg:col-span-4 xl:col-span-2 shadow-md shadow-gray-400/60`}>
                <h2 className='text-base md:text-[20px] xl:text-[18px] font-semibold text-black/80 pb-4 border-b px-6'>Resumo da compra</h2>
                { carrinho.length > 0 ? 
                <>
                <div className='flex flex-col gap-4 border-b py-5 px-6'>
                    <div className='flex justify-between text-sm md:text-base lg:text-sm'>
                        <p className=''>Produtos</p>
                        <p className=''>{masks.maskCurrency(total)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='lg:text-sm'>Frete</p>
                        <p className='lg:text-sm'>
                            {freight.delivery === 'UNSELECTED' ? 
                            <AiOutlineMinus className='w-5 h-5 text-black'/> : 
                            masks.maskCurrency(freight.price)}
                        </p>
                    </div>
                    <button className='flex items-center gap-1 font-medium text-sm md:text-base lg:text-sm'>
                        Adicionar Cupom 
                        <FiChevronRight />
                    </button>
                </div>
                <div className='flex justify-between pt-5 pb-6 px-6 text-base md:text-[18px] font-medium text-black/80'>
                    <p>Total</p>
                    <p>{masks.maskCurrency(total + freight.price)}</p>
                </div>
                <Link 
                    to={'/payment'} 
                    className='flex justify-center w-[calc(100%-48px)] py-3 bg-color-primary text-white mx-6 rounded-sm'
                    >CHECKOUT
                </Link>
                </>
                :
                <p className='px-6 text-sm pt-5'>Aqui você encontrará os valores da sua compra assim que adicionar os produtos.</p>
                }
            </div>     
        </div>
    </section>
    </>
  )
}