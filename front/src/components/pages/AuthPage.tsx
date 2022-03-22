import { useState, memo } from 'react'
import { makeStyles } from '@mui/styles';
import { SignUpForms } from '../organisms/SignupForms'
import { SignInForms } from '../organisms/SigninForms'

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
})

export const AuthPage:React.VFC = memo(() => {
  const [formToggle, setFormToggle] = useState(true)
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.title}>TODOアプリ</h1>
      {formToggle ? <SignUpForms setFormToggle={setFormToggle}/> : <SignInForms setFormToggle={setFormToggle}/>}
    </>
  )
})
