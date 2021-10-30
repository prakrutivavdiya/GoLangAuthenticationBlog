import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Logo from '../Assets/BacancyLogo.png';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignUp() {
    let history = useHistory()
    const classes = useStyles();

    const [userDetail, setUserDetail] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })

    const [isFormValid, setIsFormValid] = useState(false)

    const [validation, setValidation] = useState({
        name: {
            touched: false,
            valid: false
        },
        email: {
            touched: false,
            valid: false
        },
        password: {
            touched: false,
            valid: false
        },
        role: {
            touched: false,
            valid: false
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
        let isValid = validationHandler(event.target.name, event.target.value)
        setValidation({ ...validation, [event.target.name]: { touched: true, valid: isValid } })

        setUserDetail({ ...userDetail, [event.target.name]: event.target.value })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post('/signup', userDetail)
            .then(res => {
                if (res.data.message) {
                    alert(res.data.message);
                }
                else {
                    history.push('/')
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
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={userDetail.name}
                                onChange={handleChange}
                                error={validation.name.touched && !validation.name.valid}
                                helperText='required'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={userDetail.email}
                                onChange={handleChange}
                                error={validation.email.touched && !validation.email.valid}
                                helperText='eg abc@xyz.com'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={userDetail.password}
                                onChange={handleChange}
                                error={validation.password.touched && !validation.password.valid}
                                helperText='3-7 charecters'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}
                                fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={userDetail.role}
                                    onChange={handleChange}
                                    label="Role"
                                    name="role"
                                    error={validation.role.touched && !validation.role.valid}

                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='user'>User</MenuItem>
                                </Select>
                                <FormHelperText>required</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!isFormValid}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/' style={{ color: '#f58220' }}>
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    );
}