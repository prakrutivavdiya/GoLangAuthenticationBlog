import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import dashboardIcon from '../../Assets/dashboardIcon.jpg'
import {useHistory} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  info:{
    marginTop:100
  }
}));

const Navbar = (props) => {
    let history=useHistory();
  const classes = useStyles();
  
const handleLogout=()=>{
    history.push('/');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}
  return (
      <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Avatar  src={dashboardIcon}>
        </Avatar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccountCircle />
          </IconButton>
          <IconButton edge="start" onClick={handleLogout} className={classes.menuButton} color="inherit" aria-label="menu">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
</>
  );
}

export default Navbar