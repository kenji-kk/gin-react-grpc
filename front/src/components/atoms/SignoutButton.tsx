import { memo } from 'react'

import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const SignoutButton = memo(() => {
  return (
    <Button color="secondary">ログアウト<ExitToAppIcon sx={{ fontSize: 40 }}></ExitToAppIcon></Button>
  )
})
