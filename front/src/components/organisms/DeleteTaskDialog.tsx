import * as React from 'react';
import { useState, useEffect, useContext, memo } from 'react';
import { AuthContext } from '../../App';
import client from '../../api/client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  todoId: string;
  todoTitle: string;
  todoContent: string;
  setTodos: (value: any) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteTaskDialog:React.VFC<Props> = memo(({setDialogIsOpen, dialogIsOpen, todoId, todoTitle, todoContent, setTodos}) => {
  const handleClose = () => {
    setDialogIsOpen(false);
  };

  const authContext = useContext(AuthContext);


  const [title, setTitle] = useState(todoTitle)
  const [content, setContent] = useState(todoContent)

  const handleSubmit = async () => {
    console.log('todoId:', todoId)
    client.
    delete(`todos/${todoId}`,
    { headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.jwt
                }, 
      responseType: 'json' 
    }
    )
    .then(response => {
      console.log('response body:', response.data.data)
      setTodos((prevState:{titile:string,content:string,id:string}[]) => {
        return prevState.filter(todo => { return todo.id !== todoId; })
      })
      handleClose()
      setTitle("")
      setContent("")
    }
    )
    }

  useEffect(() => {
    console.log('todoId:', todoId)
    setTitle(todoTitle)
    setContent(todoContent)
  }, [todoTitle, todoContent])

  return (
    <div>
      <Dialog
        open={dialogIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>このタスクを削除しますか？</DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="タスク名 (readonly)"
              type="text"
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <br/>
            <br/>
            <br/>
            <TextField
              margin="dense"
              id="name"
              label="タスク内容 (readonly)"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit}>削除</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
