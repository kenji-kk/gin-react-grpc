import {memo} from 'react'
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

import { AddTaskButton } from '../atoms/AddTaskButton';

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

  return (
    <Container>
      <h1 className={classes.title}>TODOアプリ</h1>
      <div className={classes.buttonWrap}>
        <AddTaskButton />
      </div>
    </Container>
   
  )
})
