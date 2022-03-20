import { useState } from 'react'
import { SignUpForms } from '../organisms/SignupForms'
import { SignInForms } from '../organisms/SigninForms'

export const AuthPage = () => {
  const [formToggle, setFormToggle] = useState(true)


  return (
    <>
      {formToggle ? <SignUpForms setFormToggle={setFormToggle}/> : <SignInForms setFormToggle={setFormToggle}/>}
    </>
  )
}
