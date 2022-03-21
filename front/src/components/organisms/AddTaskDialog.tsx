import { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { AuthContext } from '../../App';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';


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
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const authContext = useContext(AuthContext);


  const handleClose = () => {
    setAddTaskDialogIsOpen(false);
  };

  const handleSubmit = async () => {
    axios.
    post('http://localhost:8080/todos',
    {Title: title, Content: content},
    { headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.jwt
                }, 
      responseType: 'json' 
    }
    )
    .then(response => {
      console.log('response body:', response.data.data)
    }
    )}

  return (
    <div>
        <Dialog open={AddTaskDialogIsOpen} onClose={handleClose}>
          <div className={classes.dummy}></div>
          <DialogTitle className={classes.title}>タスク作成フォームaa</DialogTitle>
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
            <Button onClick={handleSubmit}>作成</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
