import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export const AddTaskButton = () => {
  return (
    <Button  variant="contained" endIcon={<AddIcon />}>
      タスク追加
    </Button>
  )
}
