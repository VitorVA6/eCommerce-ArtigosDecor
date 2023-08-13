import { useState, useRef, useEffect } from 'react';
import {BiChevronDown} from 'react-icons/bi'

function Dropdown() {
  
  const dropdownRef = useRef(null);
  const [selOrder, setSelOrder] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false);
  const orderList = ['Em destaque', 'Em promoção', 'Ordem alfabética, A-Z', 'Ordem alfabética, Z-A', 'Preço, ordem crescente', 'Preço, ordem decrescente', 'Data, mais antiga primeiro', 'Data, mais recente primeiro']

  const handleOutsideClick = (event) => {
    if (dropdownRef.current !== null && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(!showDropdown);
    }
  };

  useEffect(() => {

    if(showDropdown){
        window.addEventListener('click', handleOutsideClick);
    }
    
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showDropdown, dropdownRef]);

  return (
    <div className="hidden md:flex flex-col bg-transparent w-fit relative z-30" ref={dropdownRef}>
      <button className='flex items-center text-sm' onClick={() =>setShowDropdown(!showDropdown)}>Ordenar por <BiChevronDown className='w-6 h-6 text-black/80 mt-0.5'/></button>
      {showDropdown && (
        <div className="flex flex-col bg-white w-fit px-3 py-4 top-[34px] -right-[70%] rounded-sm shadow-md shadow-gray-400/70 absolute z-10 whitespace-nowrap ">
            
          {
                orderList.map( (item, index) => (
                    <button 
                        key={index} className={`px-5 py-2 flex w-fit ${selOrder === index && 'text-blue-500 font-medium'}`}
                        onClick={
                            () => {
                                setSelOrder(index)
                            }
                        }
                    >
                        {item}
                        
                    </button>
                ))
            }
        </div>
      )}
    </div>
  );
}

export default Dropdown;