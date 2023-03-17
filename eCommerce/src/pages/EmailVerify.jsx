import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useUserContext } from '../contexts/User';

export default function EmailVerify() {

    const {checkAuth} = useUserContext()

    const [validUrl, setValidUrl] = useState(true);
	const {token} = useParams()

    useEffect( ()=>{
        checkAuth()

        axios.get(`/users/verify/${token}`)
        .then(({data})=> {
            setValidUrl(true)
        })
        .catch(err => setValidUrl(false))

    }, [] )

  return (
    <>
        {
            validUrl?
            <h1>E-mail atualizado com sucesso</h1>
            :
            <h1>Page not found</h1>
        }
        
    </>
  )
}
