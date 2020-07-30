import React from 'react';
import NewMember from '../NewMemberDialog/NewMember';
import NewTask from '../NewTask/NewTask';
import { Grid } from '@material-ui/core';

const Admin = () => {
  return (
    <div style={{ padding: 40 }}>
      <Grid container spacing={4}>
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
