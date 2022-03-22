import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { AuthContext } from '../../App';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  todoId: string;
  todoTitle: string;
  todoContent: string;
  fetchTodos: () => Promise<void>
}

const useStyles = makeStyles({
  dummy: {
    width: '40vw',
  },
  title: {
    textAlign: 'center'
  }
})

export const UpdateTaskDialog:React.VFC<Props> = ({dialogIsOpen, setDialogIsOpen, todoId, todoTitle, todoContent, fetchTodos}) =>{
  const classes = useStyles();
  const [title, setTitle] = useState(todoTitle)
  const [content, setContent] = useState(todoContent)

  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log('todoId:', todoId)
    setTitle(todoTitle)
    setContent(todoContent)
  }, [todoTitle, todoContent])

  const handleClose = () => {
    setTitle(todoTitle)
    setContent(todoContent)
    setDialogIsOpen(false);
  };

  const handleSubmit = async () => {
    console.log('todoId:', todoId)
    axios.
    put(`http://localhost:8080/todos/${todoId}`,
    {Id: Number(todoId), Title: title, Content: content},
    { headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.jwt
                }, 
      responseType: 'json' 
    }
    )
    .then(response => {
      console.log('response body:', response.data.data)
      fetchTodos()
      handleClose()
      setTitle("")
      setContent("")
    }
    )
    }

  return (
    <div>
        <Dialog open={dialogIsOpen} onClose={handleClose}>
          <div className={classes.dummy}></div>
          <DialogTitle className={classes.title}>タスク修正フォーム</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="タスク名"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <br/>
            <br/>
            <br/>
            <TextField
              margin="dense"
              id="name"
              label="タスク内容"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="standard"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
            <Button onClick={handleSubmit}>更新</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
