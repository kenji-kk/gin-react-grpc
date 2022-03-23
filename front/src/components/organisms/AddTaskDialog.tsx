import { useState, useContext, memo } from 'react';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '../../App';
import client from '../../api/client';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  setTodos: any
}

interface FormInputType {
  title: string
  content: string
}

const schema = yup.object({
  title: yup
    .string()
    .required('必須項目です')
    .min(1,"1文字以上で入力してください")
    .max(50,"50文字以下で入力してください"),
  content: yup
    .string()
    .required('必須項目です')
    .min(1,"1文字以上で入力してください")
    .max(50,"50文字以下で入力してください")
})

const useStyles = makeStyles({
  dummy: {
    width: '40vw',
  },
  title: {
    textAlign: 'center'
  }
})

export const AddTaskDialog:React.VFC<Props> = memo(({dialogIsOpen, setDialogIsOpen, setTodos}) =>{
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>({
    resolver: yupResolver(schema),
  })

  const handleClose = () => {
    setDialogIsOpen(false);
  };

  const onSubmit: SubmitHandler<FormInputType> = async () => {
    client.
    post('todos',
    {Title: title, Content: content},
    { headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.jwt
                }, 
      responseType: 'json' 
    }
    )
    .then(response => {
      console.log('response body:', response.data.data)
      setTodos((prevTodos:any) => [response.data.data, ...prevTodos])
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
          <DialogTitle className={classes.title}>タスク作成フォーム</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="タスク名"
              type="text"
              fullWidth
              {...register('title')}
              error={"title" in errors}
              helperText={errors.title?.message}
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
              {...register('content')}
              error={"content" in errors}
              helperText={errors.title?.message}
              multiline
              rows={4}
              variant="standard"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
            <Button onClick={handleSubmit(onSubmit)}>作成</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
})
