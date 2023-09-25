import axios from "axios";
import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext()

export default function CarrinhoProvider ( {children} ){
    const deliveryOptions = {
        sedex: 'SEDEX',
        pac: 'PAC',
        custom: 'CUSTOM',
        retired: 'RETIRED',
        unselected: 'UNSELECTED'
    }

    const [carrinho, setCarrinho] = useState([])
    const [total, setTotal] = useState(0)
    const [freight, setFreight] = useState({delivery: 'UNSELECTED', price: 0})
    const [quantTotal, setQuantTotal] = useState(0)
    const [modalCarrinho, setModalCarrinho] = useState(false)

    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, total, setTotal, quantTotal, setQuantTotal, 
            modalCarrinho, setModalCarrinho, freight, setFreight, deliveryOptions}}>
            {children}
        </CarrinhoContext.Provider>
    )
} 

export function useCarrinhoContext(){
    const {carrinho, setCarrinho, total, setTotal, quantTotal, setQuantTotal, 
        modalCarrinho, setModalCarrinho, freight, setFreight, deliveryOptions} = useContext(CarrinhoContext)

    function listaCarrinho(){
        let url = '/products/get-cart?'
        if (carrinho.length > 0){
            carrinho.forEach(element => {
                url = url + `id=${element._id}&`
            });
            axios.get(url).then(({data}) => {
                setCarrinho(data.map( (elemento) => {
                    const cartElement = carrinho.find( element => element._id === elemento._id)
                    if(!!cartElement.combinations?.length > 0){
                        const combination = elemento.combinations.find(el => el.id === cartElement.combinationId)
                        return {...elemento, 
                            quantidade: cartElement.quantidade, 
                            combinationId:cartElement.combinationId, 
                            preco: combination.price, 
                            desconto:combination.priceoff}
                        }    
                    else{
                        return {...elemento, 
                            quantidade: cartElement.quantidade, 
                            combinationId: undefined,
                        } 
                    }
                }                                  
                )) 
            })
            .catch( (erro) => {
                console.log(erro)
                setCarrinho([])
                setQuantTotal(0)
            } )
        }
        calculaTotal()
    }

    function addCarrinho(elemento, n){
        const novoProduto = carrinho.find( element => element._id === elemento._id )
        if (novoProduto){
            const aux = carrinho.map( element => {
                if (element._id === novoProduto._id){
                    return {
                        ...element,
                        quantidade: element.quantidade+n > 99 ? 99 : element.quantidade+n
                    }
                }
                return element
            } ) 
            setCarrinho(aux)
            calculaTotal(aux)
            
        }else{
            const aux = [...carrinho, {...elemento, quantidade: n}]
            setCarrinho( aux )
            calculaTotal(aux)
        }
    }

    function removeCarrinho(id){
        if (carrinho.find( element => element._id === id)){
            const aux = carrinho.filter( elem => elem._id !== id )
            setCarrinho( aux )
            calculaTotal(aux)
        }
    }

    function resetCart(){
        setCarrinho([])
        setTotal(0)
        setQuantTotal(0)
        setFreight({delivery: 'UNSELECTED', price: 0})
    }

    function alteraQuantidade(id, operador){
        if(operador === '-'){
            setCarrinho(carrinho.map( element => {
                if(element._id === id && element.quantidade > 1){
                    element.quantidade--
                }
                return element
            } ))
        }
        else {
            setCarrinho(carrinho.map( element => {
                if(element._id === id && element.quantidade<99){
                    element.quantidade++
                }
                return element
            } ))
        }
        calculaTotal()
    }

    function calculaTotal (lista = carrinho){
        setTotal( lista.reduce( (acum, atual) => acum + ( atual.quantidade*(atual.desconto>0?atual.desconto:atual.preco) ), 0 ) )
        setQuantTotal( lista.reduce( (acum, atual) => acum + atual.quantidade, 0 ) )
    }

    return {
        carrinho,
        total,
        quantTotal,
        modalCarrinho, 
        setModalCarrinho,
        freight,
        setFreight,
        deliveryOptions,
        resetCart,
        listaCarrinho,         
        addCarrinho,
        removeCarrinho,
        alteraQuantidade
    }
}