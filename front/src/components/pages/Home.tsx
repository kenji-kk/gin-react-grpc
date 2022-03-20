import React from 'react'
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

export const Home = () => {
  const classes = useStyles();

  return (
    <Container>
      <h1 className={classes.title}>TODOアプリ</h1>
      <div className={classes.buttonWrap}>
        <AddTaskButton />
      </div>
    </Container>
   
  )
}
