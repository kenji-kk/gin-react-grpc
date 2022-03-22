import { useState, useEffect, memo, useContext} from 'react'

import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

import { AuthContext } from '../../App';
import { AddTaskButton } from '../atoms/AddTaskButton';
import { AddTaskDialog } from '../organisms/AddTaskDialog';
import axios from 'axios';
import { UpdateTaskButton } from '../atoms/UpdateTaskButton';
import { UpdateTaskDialog } from '../organisms/UpdateTaskDialog';
import { DeleteTaskButton } from '../atoms/DeleteTaskButton';
import { DeleteTaskDialog } from '../organisms/DeleteTaskDialog';

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
  buttonsWrap: {
    display: 'flex',
  },
  button: {
    margin: '0 0 0 1vw',
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
  }

  useEffect(() => {
    fetchTodos()
  },[])

  return (
      <Container>
        <h1 className={classes.title}>TODOアプリ</h1>
        <div className={classes.buttonWrap}>
          <AddTaskButton handleClickOpen={handleClickAddOpen}/>
          <AddTaskDialog dialogIsOpen={addTaskDialogIsOpen} setDialogIsOpen={setAddTaskDialogIsOpen} setTodos={setTodos}/>
        </div>
        <div className={classes.todoListWrap}>
          {todos.map((todo) => (
            <div key={todo.id} >
              <p>タスクID:{todo.id}</p>
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
