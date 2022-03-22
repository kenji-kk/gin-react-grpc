import { memo } from 'react'
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  handleClickOpen: () => void;
}

export const UpdateTaskButton:React.VFC<Props> = memo(({handleClickOpen}) => {
  return (
    <Button onClick={handleClickOpen} variant="contained" color="success" endIcon={<SettingsIcon />}>修正</Button>
  )
})
