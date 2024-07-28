import React from 'react'
import logoPlaceholder from "../resources/images/logoPlaceholder.svg"

export default function Logo({text}) {
  return (
    <div className='auth-form-logo-container'>
        <img src={logoPlaceholder}/>
        <span> &nbsp; {text}</span>
    </div>
  )
}
