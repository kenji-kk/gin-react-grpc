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
  },
  todoListWrap: {
    margin: '0 auto',
    width: '30vw',
  },
})

export const Home:React.VFC = memo(() => {
  const classes = useStyles();
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  const [todos, setTodos] = useState<{title:string,content:string}[]>([]);

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
      if (response.data.data.todos?.length > 0 ){
        setTodos(response.data.data.todos)
      }
    })
  },[])

  return (
    <>
      <Container>
        <h1 className={classes.title}>TODOアプリ</h1>
        <div className={classes.buttonWrap}>
          <AddTaskButton handleClickOpen={handleClickOpen}/>
        </div>
        <div className={classes.todoListWrap}>
          {todos.map((todo, index) => (
            <div key={index} >
              <p>タスク名：{todo.title}</p>
              <p>タスク内容：{todo.content}</p>
              <hr/>
            </div>
          ))}
        </div>
      </Container>

      <AddTaskDialog AddTaskDialogIsOpen={AddTaskDialogIsOpen} setAddTaskDialogIsOpen={setAddTaskDialogIsOpen} setTodos={setTodos}/>
    </>
  )
})
