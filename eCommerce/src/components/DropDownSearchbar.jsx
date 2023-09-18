import { useState, useRef, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';

function DropDownSearchbar({categories, selCategory, setSelCategory}) {
  
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
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
    <div className="hidden lg:flex flex-col bg-transparent w-fit relative z-30" ref={dropdownRef}>
        <button 
            className='flex pl-5 lg:pl-8 pr-3 lg:pr-5 lg:gap-4 items-center border-r-[2px] cursor-pointer min-w-min max-w-10'
            onClick={() =>setShowDropdown(!showDropdown)}
        >
            {
                selCategory === 'all' ? 'Todos' : selCategory.name
            }
            <BiChevronDown className='w-5 h-5'/>
        </button>
        {showDropdown && (
        <div className="flex flex-col bg-white w-fit px-3 py-3 top-[34px] left-0 rounded-md shadow-md shadow-gray-400/70 absolute z-10 whitespace-nowrap">
            <button 
                className={`px-5 py-2 flex w-fit ${selCategory === 'all' && 'text-color-primary font-medium'}`}
                onClick={
                    () => {
                        setSelCategory('all')
                        setShowDropdown(false)
                    }
                }
            >
                Todos
            </button>
           {
                categories.map(item => (
                <button 
                    key={item._id} className={`px-5 py-2 flex w-fit ${selCategory._id === item._id && 'text-color-primary font-medium'}`}
                    onClick={
                        () => {
                            setSelCategory(item)
                            setShowDropdown(false)
                        }
                    }
                >
                    {item.name}
                </button>
                ))
            }
        </div>
      )}
    </div>
  );
}

export default DropDownSearchbar;