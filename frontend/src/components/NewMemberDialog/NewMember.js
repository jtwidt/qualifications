import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';

const NewMember = () => {
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [edipi, setEdipi] = useState();
  const [afsc, setAfsc] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [memberSnackbarOpen, setMemberSnackbarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let user = {
      firstName: firstName,
      lastName: lastName,
      edipi: edipi,
      unit: '1 ACOS',
      base: 'Ramstein AB',
      afsc: afsc,
      role: 'user',
      email: email,
      password: password,
      grade: grade,
    };
    setOpen(false);
    axios
      .post('http://localhost:8080/users', user)
      .then(setMemberSnackbarOpen(true));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={memberSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setMemberSnackbarOpen(false)}
        message="Member added"
      />
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new member's information
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <InputLabel id="grade-select-label">Grade</InputLabel>
              <Select
                labelId="grade-select-label"
                id="grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
              >
                <MenuItem value="E1">AB</MenuItem>
                <MenuItem value="E2">Amn</MenuItem>
                <MenuItem value="E3">A1C</MenuItem>
                <MenuItem value="E4">SrA</MenuItem>
                <MenuItem value="E5">SSgt</MenuItem>
                <MenuItem value="E6">TSgt</MenuItem>
                <MenuItem value="E7">MSgt</MenuItem>
                <MenuItem value="E8">SMSgt</MenuItem>
                <MenuItem value="E9">CMSgt</MenuItem>
                <MenuItem value="O1">2nd Lt</MenuItem>
                <MenuItem value="O2">1st Lt</MenuItem>
                <MenuItem value="O3">Capt</MenuItem>
                <MenuItem value="O4">Maj</MenuItem>
                <MenuItem value="O5">Lt Col</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="first-name"
                label="First Name"
                type="text"
                onChange={(event) => setfirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="last-name"
                label="Last Name"
                type="text"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="edipi"
                label="EDIPI"
                type="text"
                onChange={(event) => setEdipi(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="afsc"
                label="AFSC"
                type="text"
                onChange={(event) => setAfsc(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
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

export default NewMember;
