import React from 'react'
import { GrFormClose } from "react-icons/gr";

export default function UploadImagesBlock({uploadedImages, removeUploadedImages, images, removeFiles}) {
  return (
    <div className='flex gap-2  w-full mb-4'>
        {   uploadedImages.length > 0 ?
            uploadedImages.map( image => (
                <div 
                key = {image}
                style={{ 
                    backgroundImage: `url(${import.meta.env.VITE_AWS_URL}${image})`, 
                    boxSizing: 'border-box', backgroundSize: 'cover'}}
                    className='w-14 h-14 rounded-lg relative'
                    >
                    <button 
                        className='bg-white p-0.5 absolute -top-1.5 -right-1.5 rounded-full'
                        onClick={() => {removeUploadedImages(image)}}
                        >
                        <GrFormClose className='w-3.5 h-3.5'/>
                    </button>
                </div>
            ) ):<></>
        }
        {
            images.map( image => (
                <div 
                key = {image.id}
                style={{ backgroundImage: `url(${URL.createObjectURL(image.file)})`, boxSizing: 'border-box', backgroundSize: 'cover'}}
                className='w-14 h-14 rounded-lg relative'
                >
                    <button 
                        className='bg-white p-0.5 absolute -top-1.5 -right-1.5 rounded-full'
                        onClick={() => removeFiles(image.id)}
                        >
                        <GrFormClose className='w-3.5 h-3.5'/>
                    </button>
                </div>
            ) )
        }
    </div>
  )
}
