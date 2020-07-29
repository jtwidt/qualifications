import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  TextField,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const MemberDetail = ({ member }) => {
  const [task1Date, setTask1Date] = useState();
  const classes = useStyles();
  const rankSwitch = (grade) => {
    switch (grade) {
      case 'E1':
        return 'AB';
        break;
      case 'E2':
        return 'Amn';
        break;
      case 'E3':
        return 'A1C';
        break;
      case 'E4':
        return 'SrA';
        break;
      case 'E5':
        return 'SSgt';
        break;
      case 'E6':
        return 'TSgt';
        break;
      case 'E7':
        return 'MSgt';
        break;
      case 'E8':
        return 'SMSgt';
        break;
      case 'E9':
        return 'CMSgt';
        break;
      case 'O1':
        return '2nd Lt';
        break;
      case 'O2':
        return '1st Lt';
        break;
      case 'O3':
        return 'Capt';
        break;
      case 'O4':
        return 'Maj';
        break;
      default:
        return 'Lt Col';
        break;
    }
  };

  useEffect(() => {
    setTask1Date(member[0].completionDate);
  }, []);

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
            <br />
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
