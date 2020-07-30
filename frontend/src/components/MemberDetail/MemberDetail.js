import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  TextField,
  Divider,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const MemberDetail = ({ member }) => {
  const classes = useStyles();
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

  return (
    <div style={{ padding: 10 }}>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h3" component="h2">
                {rankSwitch(member[0].user.grade)} {member[0].user.firstName}{' '}
                {member[0].user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textSecondary">
                {member[0].user.afsc}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textSecondary">
                {member[0].user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid container item spacing={1}>
              {member.map((task) => {
                return (
                  <Grid item xs={4}>
                    <Grid>
                      <Typography variant="caption">
                        {task.task.taskName}
                      </Typography>
                    </Grid>
                    <Grid>
                      <TextField
                        id={task.id}
                        name={task.id}
                        type="date"
                        format="MM/dd/yyyy"
                        defaultValue={task.completionDate}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Container>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                className={classes.button}
              >
                Save
              </Button>
            </Container>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDetail;
