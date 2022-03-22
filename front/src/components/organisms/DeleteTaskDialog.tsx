import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
  fetchTodos: () => Promise<void>
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteTaskDialog:React.VFC<Props> = ({setDialogIsOpen, dialogIsOpen, todoId, todoTitle, todoContent}) => {
  const handleClose = () => {
    setDialogIsOpen(false);
  };

  const [title, setTitle] = useState(todoTitle)
  const [content, setContent] = useState(todoContent)

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
        <DialogTitle>このタスクを削除しますか。</DialogTitle>
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
          <Button onClick={handleClose}>削除</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
