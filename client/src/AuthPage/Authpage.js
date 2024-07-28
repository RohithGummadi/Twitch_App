import React, {useState} from 'react'
import Login from './Login.js'
import Register from './Register.js'
import "../styles/authPage.css"


export default function Authpage() {
    const [isLogin, setIsLogin] = useState(true)

    const handlerAuthPageToggle =()=>{
        setIsLogin((prev)=>!prev)
    }
  return (
    <div className='auth-container'>
        <div>
        {isLogin ? <Login switchAuthHandler={handlerAuthPageToggle}/> : <Register switchAuthHandler={handlerAuthPageToggle}/>}
        </div>

    </div>
  )
}
