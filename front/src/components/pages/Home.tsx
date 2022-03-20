import { useState, memo } from 'react'
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

import { AddTaskButton } from '../atoms/AddTaskButton';
import { AddTaskDialog } from '../organisms/AddTaskDialog';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  buttonWrap: {
    textAlign: 'center',
  }
})

export const Home:React.VFC = memo(() => {
  const classes = useStyles();
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const handleClickOpen = () => {
    setAddTaskDialogIsOpen(true);
  };

  return (
    <>
      <Container>
        <h1 className={classes.title}>TODOアプリ</h1>
        <div className={classes.buttonWrap}>
          <AddTaskButton handleClickOpen={handleClickOpen}/>
        </div>
      </Container>

      <AddTaskDialog AddTaskDialogIsOpen={AddTaskDialogIsOpen} setAddTaskDialogIsOpen={setAddTaskDialogIsOpen}/>
    </>
  )
})
