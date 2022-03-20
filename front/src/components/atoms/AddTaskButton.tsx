import { memo } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  handleClickOpen: () => void;
}

export const AddTaskButton:React.VFC<Props> = memo(({handleClickOpen}) => {
  return (
    <Button onClick={handleClickOpen} variant="contained" endIcon={<AddIcon />}>
      タスク追加
    </Button>
  )
})
