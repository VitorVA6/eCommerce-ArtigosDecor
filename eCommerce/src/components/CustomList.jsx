import React from 'react'

export default function CustomList( {title, customs, setModalCustom, setEdit, setIdCustom} ) {
  return (
    <div className='mb-6'>
            <h2 className='text-sm lg:text-base mb-3 font-medium'>{title}</h2>
            <div className='flex lg:flex-wrap gap-3 overflow-auto scrollbar-hide'>
                <button 
                    className='border border-gray-300/80 lg:border-gray-200/70 lg:px-3 lg:py-3 px-2 py-1 rounded-xl bg-gray-50'
                    onClick={() => {
                        setEdit(false)
                        setModalCustom(true)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-4 h-4 lg:w-5 lg:h-5" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                {customs.map( (custom) => (
                    <div key={custom.name ? custom.name : custom} className='flex rounded-lg lg:rounded-xl bg-gray-300 items-center pl-3 cursor-pointer'>
                        <p className='border-r mb-0.5 border-gray-400 flex items-center pr-3 text-sm'>{custom.name ? custom.name : custom}</p>
                        <button 
                            className='p-3 lg:p-3 flex justify-center'
                            onClick={() => {
                                setEdit(true)
                                setModalCustom(true)
                                setIdCustom(custom._id)
                            }}    
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                ) )}
            </div>
        </div>
  )
}
