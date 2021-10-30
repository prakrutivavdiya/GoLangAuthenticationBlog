import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../Assets/BacancyLogo.png';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {validationHandler} from '../Validation/validation';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory()
  const classes = useStyles();
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  })

  const [isFormValid, setIsFormValid] = useState(false)

  const [validation, setValidation] = useState({
    email: {
      touched: false,
      valid: false
    },
    password: {
      touched: false,
      valid: false
    }
  })

  useEffect(()=>{
    if(localStorage.getItem('token')){
      history.push(`/dashboard`)
    }
  })

  useEffect(() => {
    let valid = true
    for (let field in validation) {
      valid = valid && validation[field].valid
    }
    setIsFormValid(valid)
  }, [validation])

  const handleChange = (event) => {
    let isValid = validationHandler(event.target.name,event.target.value)
    setValidation({...validation, [event.target.name]:{ touched: true, valid: isValid } })

    setUserDetail({ ...userDetail, [event.target.name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('/signin', userDetail)
    .then(res => {
        if (res.data.message) {
          alert(res.data.message);
        }
        else {
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('role',res.data.role)
          history.push(`/dashboard`)
        }
      }).catch(err =>
        console.log(err)
      )
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar style={{ width: '20%', height: '20%', marginBottom: '5%' }} src={Logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userDetail.email}
            onChange={handleChange}
            autoFocus
            error={validation.email.touched && !validation.email.valid}
            helperText='eg abc@xyz.com'
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={userDetail.password}
            onChange={handleChange}
            autoComplete="current-password"
            error={validation.password.touched && !validation.password.valid}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isFormValid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signUp" style={{ color: '#f58220' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}