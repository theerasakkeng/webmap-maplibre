import React, { useState, useContext, useEffect } from 'react'
import { AuthComtext, AuthContext } from '../Components/Auth/AuthComtext'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { accessToken } from 'maplibre-gl';




const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '30ch',
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

        },
        paper: {
            padding: "20",
            height: "30vh",
            width: "300px",
            margin: "20px auto",
        },
    }),
);
export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { currentUser, setCurrentuser } = useContext(AuthContext);

    const history = useHistory()

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const Authorization = JSON.stringify({
            "email": email,
            "password": password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: Authorization,
            redirect: 'follow'
        };


        const res = await fetch("https://v2k.vallarismaps.com/core/api/utility/1.0/login", requestOptions)
            .then(response => response.json());
        if ("accessToken" in res) {
            localStorage.setItem('Authorization', JSON.stringify(res)) 
            setCurrentuser(res)
        }
    };
    if(currentUser){
        history.push("/mapview")
    }
    


    return (
        <Paper elevation={10} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="Email" label="Email" variant="outlined"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <TextField id="Password" label="Password" variant="outlined"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Paper>
    )
}
