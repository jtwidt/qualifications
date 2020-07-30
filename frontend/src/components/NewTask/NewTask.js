import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';

const NewTask = () => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState();
  const [description, setDescription] = useState();
  const [validDuration, setValidDuration] = useState();
  const [taskSnackbarOpen, setTaskSnackbarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let task = {
      taskName: taskName,
      description: description,
      validDuration: validDuration,
    };
    setOpen(false);
    axios
      .post('http://localhost:8080/tasks', task)
      .then(setTaskSnackbarOpen(true));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={taskSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setTaskSnackbarOpen(false)}
        message="Task added"
      />
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the new task information</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="task-name"
                label="Task Name"
                type="text"
                onChange={(event) => setTaskName(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="valid-duration"
                label="Valid Duration (in months)"
                type="text"
                onChange={(event) => setValidDuration(event.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                multiline
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewTask;
