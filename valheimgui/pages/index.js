import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

let result = "ffff";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
}))

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/hello');
  const pindakaas = await res.json();


  return {
    props: { data: pindakaas }, // will be passed to the page component as props
  }
}



export default function Home({ data }) {
  const [open, setOpen] = useState(false);

  const checkStatus = async (e) => {

    fetch('http://localhost:3000/api/checkstatus')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStatus({
          type: 'success',
          message: data.status
        });

        setTimeout(checkStatus, 5000);
      });

  }



  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const [serverlog, setServerlog] = useState({
    type: '',
    message: ''
  });


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const stopServer = async (e) => {
    const res = await fetch('http://localhost:3000/api/stop');
    setOpen(true)
    setResponse({
      type: 'success',
      message: 'Server is stopping... check status'
    });
  }


  const getServerlog = async (e) => {
    fetch('http://localhost:3000/api/getserverlog')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setServerlog({
          type: 'success',
          message: data.serverlog
        });

        setTimeout(getServerlog, 5000);
      });
  }


  useEffect(() => {
    checkStatus();
    getServerlog();
  }, []);



  const startServer = async (e) => {
    const res = await fetch('http://localhost:3000/api/start');
    setOpen(true)
    setResponse({
      type: 'success',
      message: 'Server is starting... check status'
    });
  }

  const updateServer = async (e) => {

    const res = await fetch('http://localhost:3000/api/update');
    setOpen(true)
    setResponse({
      type: 'success',
      message: 'Server is updating... restart after 10 minutes to apply'
    });

  }



  const savesettings = async (e) => {

    e.preventDefault()

    const res = await fetch('/api/save', {
      body: JSON.stringify({
        servername: e.target.servername.value,
        worldname: e.target.worldname.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    let temp = await res.json()
    console.log(temp)
    setOpen(true)
    setResponse({
      type: 'success',
      message: 'Settings saved, will be applied on next restart'
    });



  }

  const classes = useStyles()


  return (

    <div className={styles.container}>
      <Head>
        <title>Valheim Controller</title>
      </Head>

      <main className={styles.main}>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={response.message}
          action={
            <div>

              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          }
        />

        <Card className={classes.root}>
          <CardContent>
            <h1 className={styles.title}>
              Valheim Server
        </h1><br />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert severity="info">Server status: {status.message}</Alert>
              </Grid>
            </Grid>


            <form onSubmit={savesettings}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField id="servername" label="servername" defaultValue={data.servername} />
                </Grid>
                <Grid item xs={3}>
                  <TextField id="worldname" label="worldname" defaultValue={data.worldname} />
                </Grid>
                <Grid item xs={3}>
                  <TextField id="password" label="password" defaultValue={data.password} />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" type="submit" color="primary">Save settings</Button>
                </Grid>
              </Grid>

            </form>

            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button data-input="#id-input" onClick={(e) => stopServer(e)} variant="outlined" color="primary">Stop server</Button>
              </Grid>
              <Grid item xs={3}>
                <Button data-input="#id-input" onClick={(e) => startServer(e)} variant="outlined" color="primary">Start Server</Button>
              </Grid>
              <Grid item xs={3}>
                <Button data-input="#id-input" onClick={(e) => updateServer(e)} variant="outlined" color="primary">Update Server</Button>
              </Grid>

            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                Server log:<br />
                <textarea cols="100" rows="10" defaultValue={serverlog.message}>
                </textarea>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
