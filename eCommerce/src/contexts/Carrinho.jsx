import axios from "axios";
import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext()

export default function CarrinhoProvider ( {children} ){
    const [carrinho, setCarrinho] = useState([
        ])
    const [total, setTotal] = useState(0)
    const [quantTotal, setQuantTotal] = useState(0)
    const [modalCarrinho, setModalCarrinho] = useState(false)

    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, total, setTotal, quantTotal, setQuantTotal, modalCarrinho, setModalCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )
} 

export function useCarrinhoContext(){
    const {carrinho, setCarrinho, total, setTotal, quantTotal, setQuantTotal, modalCarrinho, setModalCarrinho} = useContext(CarrinhoContext)

    function listaCarrinho(){
        let url = '/produtos?'
        if (carrinho > 0){
            carrinho.forEach(element => {
                url = url + `id=${element.id}&`
            });
            axios.get(url).then(({data}) => {
                setCarrinho(data.map( (elemento, index) => ({...elemento, quantidade: carrinho[index]?.quantidade}) )) 
            })
            .catch( (erro) => console.log(erro) )
        }
        calculaTotal()
    }

    function addCarrinho(elemento, n){
        const novoProduto = carrinho.find( element => element.id === elemento.id )
        if (novoProduto){
            const aux = carrinho.map( element => {
                if (element.id === novoProduto.id){

                    element.quantidade= element.quantidade+n
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
        setModalCarrinho(true)
    }

    function removeCarrinho(id){
        if (carrinho.find( element => element.id === id)){
            const aux = carrinho.filter( elem => elem.id !== id )
            setCarrinho( aux )
            calculaTotal(aux)
        }
    }

    function alteraQuantidade(id, operador){
        if(operador === '-'){
            setCarrinho(carrinho.map( element => {
                if(element.id === id && element.quantidade > 1){
                    element.quantidade--
                }
                return element
            } ))
        }
        else {
            setCarrinho(carrinho.map( element => {
                if(element.id === id){
                    element.quantidade++
                }
                return element
            } ))
        }
        calculaTotal()
    }

    function calculaTotal (lista = carrinho){
        setTotal( lista.reduce( (acum, atual) => acum + ( atual.quantidade*atual.preco ), 0 ) )
        setQuantTotal( lista.reduce( (acum, atual) => acum + atual.quantidade, 0 ) )
    }

    return {
        carrinho,
        total,
        quantTotal,
        modalCarrinho, 
        setModalCarrinho,
        listaCarrinho,         
        addCarrinho,
        removeCarrinho,
        alteraQuantidade
    }
}