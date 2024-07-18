import { useState } from 'react'

import * as NextLink from 'next/link'

import { useRouter } from 'next/router'

import Axios from 'axios'

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

const Signup = () => {
  const [form, setForm] = useState({})
  const router = useRouter()

  const handleFormChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        form
      )

      router.replace('/')
    } catch (error) {
      alert('Verifica los campos ingresados.')
    }
  }

  return (
    <Layout page="signup">
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
                Registro
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
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => handleFormChange(event)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Nombre Completo"
                  name="fullName"
                  autoComplete="fullName"
                  onChange={(event) => handleFormChange(event)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Numero de Telefono"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  onChange={(event) => handleFormChange(event)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
                  Registrarse
                </Button>
                <Grid container>
                  <Grid item xs>
                    <NextLink.default href="/login">
                      <Link href="#" variant="body2">
                        {'Tienes cuenta? Inicia Sesión'}
                      </Link>
                    </NextLink.default>
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

export default Signup
