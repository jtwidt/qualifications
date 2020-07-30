import React, { useState } from 'react';
import NewMember from '../NewMemberDialog/NewMember';
import NewTask from '../NewTask/NewTask';
import { Grid, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateIcon from '@material-ui/icons/Update';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

const Admin = (props) => {
  const [searchName, setSearchName] = useState();
  const [member, setMember] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = (event) => {
    event.target.value = '';
    axios
      .get(`http://localhost:8080/users/last/${searchName}`)
      .then((response) => setMember(response.data[0]));
  };

  const rankSwitch = (grade) => {
    switch (grade) {
      case 'E1':
        return 'AB';
      case 'E2':
        return 'Amn';
      case 'E3':
        return 'A1C';
      case 'E4':
        return 'SrA';
      case 'E5':
        return 'SSgt';
      case 'E6':
        return 'TSgt';
      case 'E7':
        return 'MSgt';
      case 'E8':
        return 'SMSgt';
      case 'E9':
        return 'CMSgt';
      case 'O1':
        return '2nd Lt';
      case 'O2':
        return '1st Lt';
      case 'O3':
        return 'Capt';
      case 'O4':
        return 'Maj';
      default:
        return 'Lt Col';
    }
  };

  const handleChange = (category, event) => {
    let newData = { ...member, [category]: event.target.value };
    setMember(newData);
  };

  const handleUpdate = () => {
    axios
      .patch(`http://localhost:8080/users/${member.id}`, member)
      .then(setSnackbarOpen(true));
    setMember(null);
    props.requery(true);
  };

  const renderMember = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Typography variant="h4">
            {rankSwitch(member.grade)} {member.firstName} {member.lastName}
          </Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="afsc"
            label="AFSC"
            type="text"
            defaultValue={member.afsc}
            onChange={(event) => handleChange('afsc', event)}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role"
            value={member.role}
            onChange={(event) => handleChange('role', event)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="udm">Unit Deployment Manager</MenuItem>
            <MenuItem value="commander">Commander</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            defaultValue={member.email}
            onChange={(event) => handleChange('email', event)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="edipi"
            label="EDIPI"
            type="text"
            defaultValue={member.edipi}
            onChange={(event) => handleChange('edipi', event)}
          />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <InputLabel id="grade-select-label">Grade</InputLabel>
          <Select
            labelId="grade-select-label"
            id="grade"
            value={member.grade}
            onChange={(event) => handleChange('grade', event)}
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
        <Grid item xs={5} />
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<UpdateIcon />}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <div style={{ padding: 40 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Member updated"
      />
      <Grid container spacing={4}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <TextField
            autoFocus
            id="search-members"
            label="Search by last name..."
            type="search"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleClick(event);
              }
            }}
            onChange={(event) => setSearchName(event.target.value)}
          />
          <IconButton onClick={(event) => handleClick(event)}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4} />
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            {member ? renderMember() : null}
          </Grid>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={2}>
          <NewMember />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={2}>
          <NewTask />
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
