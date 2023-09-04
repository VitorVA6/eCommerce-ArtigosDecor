import React from 'react'
import {FaCheck} from 'react-icons/fa'

export default function PaymentBlock({step, title, desc, children, selected, completed, disabled, altDesc, setChange, change}) {

    function classTitle(){
        let titleClass = ''
        if(selected === true){
            titleClass = 'text-black'
        }
        else if(completed === true || disabled === false){
            titleClass = 'text-[#36b376]'
        }
        else if(disabled === true){
            titleClass = 'text-black'
        }
        return titleClass
    }
    function classStep(){
        
        if(selected === true){
            return 'bg-[#28be09]'
        }
        else if(completed === true || disabled === false){
            return 'bg-[#36b376]'
        }
        else if(disabled === true){
            return 'bg-gray-400'
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

    function cursorClass(){
        if(disabled === true){
            return 'cursor-default'
        }
        else if (selected === true){
            return 'cursor-auto'
        }
        else if(completed === true){
            return 'cursor-pointer'
        }else{
            return 'cursor-pointer'
        }
    }

  return (
    <div 
        className={`${step==='3'?'order-2':''} ${change===step?'flex':'hidden'} xl:flex flex-col bg-white px-4 xl:px-5 py-5 md:rounded-md shadow-md/90 h-fit ${cursorClass()} ${disabled===true&&'opacity-40'}`}
        onClick={() => {
            if(disabled===false && selected===false){
                setChange(step)
            }
        }}
    >
        <div className='flex gap-2 items-center'>
            <span className={`${classStep()} w-6 h-6 rounded-full text-[15px] flex justify-center items-center text-white font-bold`}>
                {step}
            </span>
            <h2 className={`text-[20px] font-bold ${classTitle()} text-black/90`}>{title}</h2>
            {
                completed === true &&
                <FaCheck className='text-[#36b376] w-4 h-4 ml-1'/>
            }
        </div>
        
        <p className='text-sm mt-2 text-gray-600'>
            {
                selectDesc()
            }
        </p>        
          
        {children}

    </div>
  )
}
