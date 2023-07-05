import React from 'react'
import {FaCheck} from 'react-icons/fa'

export default function PaymentBlock({step, title, desc, children, selected, completed, disabled, altDesc}) {

    function classTitle(){
        let titleClass = ''
        if(selected === true){
            titleClass = 'text-black'
        }
        else if(completed === true){
            titleClass = 'text-[#36b376]'
        }
        else if(disabled === true){
            titleClass = 'text-gray-600'
        }
        return titleClass
    }
    function classStep(){
        
        if(selected === true){
            return 'bg-[#28be09]'
        }
        else if(completed === true){
            return 'bg-[#36b376]'
        }
        else if(disabled === true){
            return 'bg-gray-600'
        }
    }
    function selectDesc(){
        if(selected === true){
            return desc
        }
        else if(disabled === true){
            return altDesc
        }   
    }

  return (
    <div className='flex flex-col bg-white px-6 py-6 rounded-lg shadow-md/90 h-fit'>
        <div className='flex gap-2 items-center'>
            <span className={`${classStep()} w-6 h-6 rounded-full text-sm flex justify-center items-center text-white font-bold mb-0.5`}>{step}</span>
            <h2 className={`text-[20px] font-bold ${classTitle()}`}>{title}</h2>
            {
                completed === true &&
                <FaCheck className='text-[#36b376] w-4 h-4 ml-1'/>
            }
        </div>
        
        <p className='text-[13px] my-2 text-gray-600'>
            {
                selectDesc()
            }
        </p>        
          
        {children}

    </div>
  )
}
