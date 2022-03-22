import { memo, useContext } from 'react'
import { AuthContext } from "../../App"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"

import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const SignoutButton:React.VFC = memo(() => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = () => {
    authContext.setIsSignedIn(false);
    authContext.setJwt(undefined);
    Cookies.remove("_access_token");
    navigate('/');
  }


  return (
    <Button onClick={handleClick} color="secondary">ログアウト<ExitToAppIcon sx={{ fontSize: 40 }}></ExitToAppIcon></Button>
  )
})
