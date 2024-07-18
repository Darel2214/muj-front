import { useState } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'

import { setCookie } from 'nookies'

import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Layout from '../components/layout/index.js'
import { useMutation } from 'react-query'
import { login } from '../api/mutations/index.js'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mujerseguraec.com">
        Mujer Segura
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Login = () => {
  const [form, setForm] = useState({})

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      console.log(data)
      
      const access_token = data.access_token
      setCookie(null, 'access_token', access_token)

      router.push('/')
    },
    onError: (error) => {
      alert('Verifica los campos ingresados')
    },
  })

  const router = useRouter()

  const handleFormChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    loginMutation.mutate(form)
  }

  return (
    <Layout page="login">
      <Container sx={{ zIndex: 1 }}>
        <Grid container component="main">
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://i2.wp.com/ellashablan.com/wp-content/uploads/2019/04/mujer-segura.jpg?fit=1360%2C907&ssl=1)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="dni"
                  label="Cédula"
                  name="dni"
                  autoComplete="dni"
                  autoFocus
                  onChange={(event) => handleFormChange(event)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => handleFormChange(event)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar Sesión
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/password_reset" variant="body2">
                      Olvidaste los datos?
                    </Link>
                  </Grid>
                  <Grid item>
                    {/* <RouterLink to="/signup"> */}
                    <Link href="/signup" variant="body2">
                      {'No tienes cuenta? Registrate'}
                    </Link>
                    {/* </RouterLink> */}
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Login
