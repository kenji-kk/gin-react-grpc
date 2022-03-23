import { useState, useContext, memo }from 'react';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import Cookies from 'js-cookie';
import client from '../../api/client';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface PROPS {
  setFormToggle: (value: boolean) => void;
}

interface FormInputType {
  email: string
  password: string
}

const schema = yup.object({
  email: yup
    .string()
    .required('必須項目です')
    .email('正しいメールアドレス入力してね')
    .min(5,"5文字以上で入力してください")
    .max(100,"100文字以下で入力してください"),
  password: yup
    .string()
    .required('必須項目です')
    .min(7,"7文字以上で入力してください")
    .max(32,"30文字以下で入力してください")
})

const theme = createTheme();

export const SignInForms: React.VFC<PROPS> = memo(({setFormToggle}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setIsSignedIn, setCurrentUser, setJwt, jwt } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputType> = async () => {
    client
    .post('signin',
    {Email: email, Password: password},
    { headers: {'Content-Type': 'application/json'}, responseType: 'json' }
    )
    .then(response => {
      console.log('response body:', response.data)
      setIsSignedIn(true)
      setJwt(response.data.jwt)
      setError('')
      console.log('jwtがセットされました:', jwt)
      Cookies.set("_access_token", response.data.jwt)
      navigate('/')}
    )
    .catch(error => {
      console.log('error:', error)
      setError(`${error}`)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          {error && <Typography variant="body2" color="error.main">{error}</Typography>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              {...register('email')}
              error={"email" in errors}
              helperText={errors.email?.message}
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register('password')}
              error={"password" in errors}
              helperText={errors.password?.message}
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              ログイン
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => {setFormToggle(true)}}>
                  アカウントお持ちでない方はこちら
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
})
