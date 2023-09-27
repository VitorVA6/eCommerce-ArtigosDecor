import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toobarOptions = [
    ['bold', 'italic', 'underline'], 
    ['link', 'image'], 
    [{ size: [ 'small', false, 'large', 'huge' ]}],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }]
]
const module = {
    toolbar: toobarOptions
}

export default function Editor({val, setVal}) {
  return (
    <ReactQuill
        modules={module}
        value={val} 
        onChange={setVal}
        theme='snow'
    />
  )
}
