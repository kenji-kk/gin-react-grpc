import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  AddTaskDialogIsOpen: boolean;
  setAddTaskDialogIsOpen: (value: boolean) => void;
}

const useStyles = makeStyles({
  dummy: {
    width: '40vw',
  },
  title: {
    textAlign: 'center'
  }
})

export const AddTaskDialog:React.VFC<Props> = ({AddTaskDialogIsOpen, setAddTaskDialogIsOpen}) =>{
  const classes = useStyles();

  const handleClose = () => {
    setAddTaskDialogIsOpen(false);
  };

  return (
    <div>
      <Dialog open={AddTaskDialogIsOpen} onClose={handleClose}>
        <div className={classes.dummy}></div>
        <DialogTitle className={classes.title}>タスク作成フォーム</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="タスク名"
            type="text"
            fullWidth
            variant="standard"
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
          <Button onClick={handleClose}>作成</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
