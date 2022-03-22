import { memo } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



export const DeleteTaskButton:React.VFC = memo(() => {
  return (
    <Button variant="contained" color="error" endIcon={<DeleteIcon />}>削除</Button>
  )
})
