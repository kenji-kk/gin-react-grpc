import { memo } from 'react'
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  handleClickOpen: any;
  todo: any;
}

export const UpdateTaskButton:React.VFC<Props> = memo(({handleClickOpen, todo}) => {
  return (
    <Button onClick={() => {handleClickOpen(todo)}} variant="contained" color="success" endIcon={<SettingsIcon />}>修正</Button>
  )
})
