import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router'
import Navbar from '../Navbar/navbar';

const useStyles = makeStyles((theme) => ({
    info:{
      marginTop:100
    }
  }));

const Dashboard = () => {
const classes = useStyles();
const role = localStorage.getItem('role')
  return (
      <>
      <Navbar />  
      <Typography variant="h5" className={classes.info}>
        Welcome {role}
      </Typography>
</>
  );
}

export default withRouter(Dashboard)