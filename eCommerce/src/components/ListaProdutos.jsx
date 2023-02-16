import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrinhoContext } from '../contexts/Carrinho'

export default function ListaProdutos({produtos}) {

    const {addCarrinho} = useCarrinhoContext()
    const navigate = useNavigate()

  return (
    <section className='p-9'>
        <h2 className='text-3xl font-medium'>Todos os produtos</h2>
        <p className='text-gray-500'>{produtos.length} produtos encontrados</p>
        <div className='w-full grid grid-cols-3 gap-x-3 gap-y-10 my-8'>
            {
                produtos.map( (produto)=> (                   
                    <div 
                        key={produto.id} 
                        className='flex flex-col w-full'>
                        <div 
                            className='relative h-72 p-2 gap-2 cursor-pointer' 
                            style={{ backgroundImage: `url(${produto.img})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
                            onClick={(e) => {
                                if(e.currentTarget != e.target ) return;
                                navigate(`/produto/${produto.id}`)
                                }} 
                            >
                            {
                                produto.destaque ? 
                                <h4 className='text-white text-xs bg-green-500 py-1 px-2 rounded-md inline-flex mr-1'>EM DESTAQUE</h4>: <></>
                            }
                            {
                                produto.desconto > 0 ?
                                <h4 className='text-white text-xs bg-green-500 py-1 px-2 rounded-md inline-flex'>{`${produto.desconto}%`}</h4>:
                                ''
                            }
                            <button className='bg-white p-2 absolute bottom-2 right-2 rounded-full' onClick={() => addCarrinho(produto, 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className='p-3'>
                            <p className='text-sm'>{produto.title}</p>
                            <p className={`inline mr-2 ${produto.desconto > 0 && 'text-green-500'}`}>{(produto.preco*((100 - produto.desconto)/100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> 
                            {
                                produto.desconto > 0 &&
                                <p className='inline line-through text-gray-500'>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            }
                            
                        </div>
                    </div>                    
                ) )
            }
        </div>
    </section>
  )
}
