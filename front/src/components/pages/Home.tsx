import React from 'react'
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

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
        <Button  variant="contained" endIcon={<AddIcon />}>
          タスク追加
        </Button>
      </div>
    </Container>
   
  )
}
