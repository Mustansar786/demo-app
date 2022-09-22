import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@mui/styles';
import { Container, TextField, Grid, IconButton, Button, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUser, updateUser } from '../../DAL/User/User';

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
    height: 300
  },
  loading: {
    marginLeft: '50%',
    marginTop: '20%'
  }
}));

function UpdateUser(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setIswaiting] = useState(false);
  const [first_name, setFirst_Name] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIswaiting(true);
    const postData = {
      first_name,
      last_name,
      email,
      password 
    }
    const result = await updateUser(id, postData);
    if (result.code === 200) {
      setIswaiting(false);
      navigate(-1);
    } else {
      enqueueSnackbar(result.message, { variant: 'error' });
      setIswaiting(false);
    }
  };

  const fetchListing = async () => {
    setIswaiting(true);
    const result = await getUser(id);
    if (result.code === 200) {
    //   setData(result.data);
    setFirst_Name(result.data.first_name);
    setLast_Name(result.data.last_name);
    setEmail(result.data.email);
      setIswaiting(false);
    } else {
      setIswaiting(false);
      enqueueSnackbar(result.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  if (iswaiting) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <>
      <Container maxWidth="sm">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ mb: 5 }} style={{ textAlign: 'center' }}>
          Update User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                required
                value={first_name}
                onChange={(e) => setFirst_Name(e.target.value)}
                id="first"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                value={last_name}
                onChange={(e) => setLast_Name(e.target.value)}
                id="last"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="dense"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                margin="dense"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                label="Password"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid> */}

            
           
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button variant="contained" type="submit">
                Update User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default UpdateUser;
