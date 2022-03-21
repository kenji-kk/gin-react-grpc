import { useState, useEffect, memo, useContext} from 'react'

import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

import { AuthContext } from '../../App';
import { AddTaskButton } from '../atoms/AddTaskButton';
import { AddTaskDialog } from '../organisms/AddTaskDialog';
import axios from 'axios';

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

  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios
    .get('http://localhost:8080/todos',
    { headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.jwt
                }, 
    responseType: 'json' }
    )
    .then(response => {
      console.log('response body:', response.data.data)
    })
  })

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
