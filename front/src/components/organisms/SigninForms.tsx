import { useState, useContext, memo }from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"

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

const theme = createTheme();

export const SignInForms: React.VFC<PROPS> = memo(({setFormToggle}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsSignedIn, setCurrentUser, setJwt, jwt } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
    .post('http://localhost:8080/signin',
    {Email: email, Password: password},
    { headers: {'Content-Type': 'application/json'}, responseType: 'json' }
    )
    .then(response => {
      console.log('response body:', response.data)
      setIsSignedIn(true)
      setJwt(response.data.jwt)
      console.log('jwtがセットされました:', jwt)
      navigate('/')}
    )
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
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
