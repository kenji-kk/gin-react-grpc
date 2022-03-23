import { useState, useEffect, memo, useContext} from 'react'

import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

import { AuthContext } from '../../App';
import { AddTaskButton } from '../atoms/AddTaskButton';
import { AddTaskDialog } from '../organisms/AddTaskDialog';
import { UpdateTaskButton } from '../atoms/UpdateTaskButton';
import { UpdateTaskDialog } from '../organisms/UpdateTaskDialog';
import { DeleteTaskButton } from '../atoms/DeleteTaskButton';
import { DeleteTaskDialog } from '../organisms/DeleteTaskDialog';
import { SignoutButton } from '../atoms/SignoutButton';
import client from '../../api/client';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  signoutWrap: {
    position: 'fixed',
    right: '5vw',
    top: '11vh',
  },
  buttonWrap: {
    textAlign: 'center',
  },
  todoListWrap: {
    margin: '0 auto',
    width: '30vw',
  },
  buttonsWrap: {
    display: 'flex',
  },
  button: {
    margin: '0 0 0 1vw',
  },
  fixAddbutton:{
    position: 'fixed',
    right: '18vw',
    top: '12vh',
  }
})

export const Home:React.VFC = memo(() => {
  const classes = useStyles();
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  const [updateTaskDialogIsOpen, setUpdateTaskDialogIsOpen] = useState(false);
  const [deleteTaskDialogIsOpen, setDeleteTaskDialogIsOpen] = useState(false);
  const [todos, setTodos] = useState<{id:string, title:string,content:string}[]>([]);
  const [currentTodoId, setCurrentTodoId] = useState("");
  const [currentTodoTitle, setCurrentTodoTitle] = useState("");
  const [currentTodoContent, setCurrentTodoContent] = useState("");

  const handleClickAddOpen = () => {
    setAddTaskDialogIsOpen(true);
  };
  const handleClickUpdateOpen = (todo:any) => {
    setCurrentTodoId(todo.id)
    setCurrentTodoTitle(todo.title);
    setCurrentTodoContent(todo.content);
    setUpdateTaskDialogIsOpen(true);
  };
  const handleClickDeleteOpen = (todo:any) => {
    setCurrentTodoId(todo.id)
    setCurrentTodoTitle(todo.title);
    setCurrentTodoContent(todo.content);
    setDeleteTaskDialogIsOpen(true);
  };

  const authContext = useContext(AuthContext);
  
  const fetchTodos = async () => {
    client
    .get('todos',
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
  }

  useEffect(() => {
    fetchTodos()
  },[])

  return (
      <Container>
        <h1 className={classes.title}>TODOアプリ</h1>
        <div className={classes.signoutWrap}><SignoutButton /></div>
        <div className={classes.buttonWrap}>
          <div className={classes.fixAddbutton}><AddTaskButton handleClickOpen={handleClickAddOpen}/></div>
          <AddTaskDialog dialogIsOpen={addTaskDialogIsOpen} setDialogIsOpen={setAddTaskDialogIsOpen} setTodos={setTodos}/>
        </div>
        <div className={classes.todoListWrap}>
          {todos.map((todo) => (
            <div key={todo.id} >
              <p>タスク名：{todo.title}</p>
              <p>タスク内容：{todo.content}</p>
              <div className={classes.buttonsWrap}>
                <div><UpdateTaskButton handleClickOpen={handleClickUpdateOpen} todo={todo}/></div>
                <div className={classes.button} ><DeleteTaskButton handleClickOpen={handleClickDeleteOpen} todo={todo}/></div>
              </div>
              <hr/>
            </div>
          ))}
        </div>

        <UpdateTaskDialog dialogIsOpen={updateTaskDialogIsOpen} setDialogIsOpen={setUpdateTaskDialogIsOpen} todoId={currentTodoId} todoTitle={currentTodoTitle} todoContent={currentTodoContent} fetchTodos={fetchTodos}/>
        <DeleteTaskDialog dialogIsOpen={deleteTaskDialogIsOpen} setDialogIsOpen={setDeleteTaskDialogIsOpen} todoId={currentTodoId} todoTitle={currentTodoTitle} todoContent={currentTodoContent} setTodos={setTodos}/>
      </Container>
  )
})
