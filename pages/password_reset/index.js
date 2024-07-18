import { Avatar, Box, Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import keygen from "keygen"
import Layout from "../../components/layout";
import { useState } from "react";

import emailjs from "@emailjs/browser";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'


const PasswordReset = () => {

  const [keySended, setKeySended] = useState(false);
  const [email, setEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [validToChange, setValidToChange] = useState(false);
  const [password, setPassword] = useState('');

  const generatedkey = keygen.url(12);



  const handleReset = () => {
    if (email === '') {
      console.log("Ingrese un correo");
      return;
    }
    emailjs.send(
      "service_",
      "template_",
      {
        to_email: "mospmanta@gmail.com",
        message: `Tu clave de recuperación es: ${generatedkey}`,
        from_name: 'Mujer Segura',
        to_name: "Usuario"
      },
      {
        publicKey: '',
      }
    ).then((result) => {
      console.log(result);

      setKeySended(true);
    })

  }

  const handleResetWithCode = () => {
    if (generatedkey === recoveryCode) {
      setValidToChange(true);
    } else {
      console.log("Código incorrecto");
    }
  }

  return (
    <Layout page="login">
      <Container sx={{ zIndex: 1 }}>
        <Grid container component="main">
          <CssBaseline />

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
                Recuperación de Contraseña
              </Typography>

              {
                keySended ? (
                  <div>
                    <Box>
                      {
                        validToChange ? (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Contraseña"
                            name="password"
                            autoFocus
                            onChange={(event) => setPassword(event.target.value)}
                          />
                        ) : (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Código de Recuperación"
                            name="recoveryCode"
                            autoComplete="recoveryCode"
                            autoFocus
                            onChange={(event) => setRecoveryCode(event.target.value)}
                          />
                        )
                      }
                    </Box>
                  </div>
                ) : (
                  <div>
                    <Box>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Box>
                  </div>
                )
              }
              {
                validToChange ? (
                  <Button
                    onClick={() => console.log(password)}
                  >
                    Cambiar Contraseña
                  </Button>
                ) : (
                  <></>
                )
              }
              {
                keySended && !validToChange ? (
                  <Button
                    onClick={() => handleResetWithCode()}
                  >
                    Validar Código
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleReset()}
                  >
                    Reiniciar password
                  </Button>
                )
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default PasswordReset;