import { memo } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
  handleClickOpen: any;
  todo: any;
}

export const DeleteTaskButton:React.VFC<Props> = memo(({handleClickOpen, todo}) => {
  return (
    <Button onClick={() => {handleClickOpen(todo)}} variant="contained" color="error" endIcon={<DeleteIcon />}>削除</Button>
  )
})
