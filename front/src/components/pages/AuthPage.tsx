import { useState } from 'react'
import { SignUp } from '../organisms/Signup'
import { SignIn } from '../organisms/Signin'

export const AuthPage = () => {
  const [formToggle, setFormToggle] = useState(true)


  return (
    <>
      {formToggle ? <SignUp setFormToggle={setFormToggle}/> : <SignIn setFormToggle={setFormToggle}/>}
    </>
  )
}
