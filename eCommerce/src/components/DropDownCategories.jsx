import { useState, useRef, useEffect } from 'react';
import { useCategoryContext } from '../contexts/Category';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {AiOutlineStar, AiOutlineTag} from 'react-icons/ai'
import {MdOutlineNewReleases} from 'react-icons/md'
import {BsArrowRight} from 'react-icons/bs'

function DropdownCategories() {
  
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const {categories} = useCategoryContext()

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
    <div className="lg:text-[13px] xl:text-sm font-medium bg-blue-600 text-gray-100 h-[calc(100%+8px)] absolute lg:left-10 xl:left-32 bottom-0 rounded-t-lg flex items-center" ref={dropdownRef}>
      <button 
        className='flex items-center relative px-10 h-full rounded-t-lg gap-3' 
        onClick={() =>setShowDropdown(!showDropdown)}
    >
        <FiMenu className='w-5 h-5'/>
        TODAS CATEGORIAS
    </button>
        {showDropdown && (
        <div className="flex flex-col border-b border-l border-r border-gray-400 bg-white left-0 top-[calc(100%)] w-full absolute whitespace-nowrap rounded-b-lg text-black/80 font-normal z-40"> 
           {
                categories.map( category => (
                    <Link 
                        key={category._id} 
                        to={`/category/${category._id}`}
                        className='px-6 py-3 border-b border-gray-300/70 gap-4 flex items-center'
                        onClick={() => setShowDropdown(false)}
                    >
                        <BsArrowRight className='text-gray-400 w-5 h-5'/>
                        {category.name}
                    </Link>
                ))
            }
            <Link to={'/category/destaques'} className='px-6 py-3 border-b border-gray-300/70 gap-4 flex items-center'>
                <AiOutlineStar className='text-gray-400 w-5 h-5'/>
                Destaques
            </Link>
            <Link to={'/category/promocoes'} className='px-6 py-3 border-b border-gray-300/70 gap-4 flex items-center'>
                <AiOutlineTag className='text-gray-400 w-5 h-5'/>
                Promocões
            </Link>
            <Link to={'/category/lancamentos'} className='px-6 py-3 mb-2 gap-4 flex items-center'>
                <MdOutlineNewReleases className='text-gray-400 w-5 h-5'/>
                Lançamentos
            </Link>
        </div>
      )}
    </div>
  );
}

export default DropdownCategories;