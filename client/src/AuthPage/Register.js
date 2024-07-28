import React, {useState} from 'react'
import Logo from './Logo.js'
import AuthInput from './AuthInput.js'
import validateEmail from '../shared/validators/validateEmail.js'
import validatePassword, { passwordValidationMessage } from '../shared/validators/validatePassword.js'
import { emailValidationMessage } from '../shared/validators/validateEmail.js'
import validatePasswordConf, { passwordConfValidationMessage } from '../shared/validators/validatePasswordConf.js'
import validateUsername, { usernameValidationMessage } from '../shared/validators/validateUsername.js'
import { useRegister } from '../shared/hooks/useRegister.js'

export default function Register ({switchAuthHandler}) {

    const {isLoading, register} = useRegister()

    const [formState, setFormState] = useState({ 
        email : {
            value:"",
            isValid: false,
            showError:false
        },
        password : {
            value:"",
            isValid: false,
            showError: false
        },
        username : {
          value:"",
          isValid: false,
          showError: false

        },
        passwordConf : {
          value:"",
          isValid: false,
          showError: false

        }
    })

    const handleInputValueChange = (value, field) =>{
        setFormState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            },

        }))

    }

    const handleInputValidationOnBlur = (value, field) =>{
        let isValid = false
        switch(field){
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value)
                break

            case "username":
                isValid = validateUsername(value)
                break;

            case "passwordConf":
              isValid = validatePasswordConf(formState.password.value, value)
              break;
            
            default:
              break;
            
        }
        setFormState(prevState=>({
            ...prevState,
            [field]:{
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleRegister= (event)=>{
        event.preventDefault();
        register(formState.email.value, formState.password.value, formState.username.value)

    }
    const disableRegister = isLoading || !formState.password.isValid || !formState.email.isValid || !formState.username.isValid || formState.password.value !==formState.passwordConf.value
    // console.log(formState)
    // console.log(isLoading)
    // console.log(disableRegister)

  return (
    <div className="register-container">
        <Logo text = {"Sign up to Stream!"}/>
        <form className='auth-form'>
            <AuthInput type="text" field="email" label="Email" value={formState.email.value} onChangeHandler={handleInputValueChange} onBlurHandler={handleInputValidationOnBlur} showErrorMessage={formState.email.showError} validationMessage={emailValidationMessage}/>
            <AuthInput type="text" field="username" label="Username" value={formState.username.value} onChangeHandler={handleInputValueChange} onBlurHandler={handleInputValidationOnBlur} showErrorMessage={formState.username.showError} validationMessage={usernameValidationMessage}/>
            <AuthInput type="password" field="password" label="Password" value={formState.password.value} onChangeHandler={handleInputValueChange} onBlurHandler={handleInputValidationOnBlur} showErrorMessage={formState.password.showError} validationMessage={passwordValidationMessage}/>
            <AuthInput type="password" field="passwordConf" label="Password confirmation" value={formState.passwordConf.value} onChangeHandler={handleInputValueChange} onBlurHandler={handleInputValidationOnBlur} showErrorMessage={formState.passwordConf.showError} validationMessage={passwordConfValidationMessage}/>
            <button disabled={disableRegister} onClick={handleRegister}>Register</button>
        </form>

        <span onClick={switchAuthHandler} className='auth-form-switch-label'>Have an account ? Sign-in</span>


    </div>
  )
}
