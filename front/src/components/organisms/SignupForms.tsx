import { useState, useContext, memo }from 'react';
import { AuthContext } from "../../App"
import { useNavigate } from "react-router-dom"

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

import axios from 'axios';

interface PROPS {
  setFormToggle: (value: boolean) => void;
}

const theme = createTheme();

export const SignUpForms:React.VFC<PROPS> = memo(({setFormToggle}) =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsSignedIn, setCurrentUser, setJwt, jwt } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
    .post('http://localhost:8080/signup',
    {UserName: name, Email: email, Password: password},
    { headers: {'Content-Type': 'application/json'}, responseType: 'json' }
    )
    .then(response => {
      console.log('response body:', response.data)
      setIsSignedIn(true)
      setJwt(response.data.jwt)
      console.log('jwtがセットされました:', jwt)
      navigate('/')
    });
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
            新規登録
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="UserName"
                  required
                  fullWidth
                  id="UserName"
                  label="ユーザ名"
                  autoFocus
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => {setFormToggle(false)}}>
                  アカウントお持ちの方はこちら
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
})
