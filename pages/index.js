/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

// Cookies
import nookies from 'nookies'

// Styles
import { Box, IconButton, Typography } from '@mui/material'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'

// Components
import Layout from '../components/layout/index.js'
import { useMutation, useQuery } from 'react-query'
import { me } from '../api/queries/index.js'
import { sendAlertMutation } from '../api/mutations/index.js'
import { useState } from 'react'
import { useGeolocation } from '@uidotdev/usehooks'
import emailjs from '@emailjs/browser';

const Index = ({ access_token }) => {

  const [user, setUser] = useState(null)

  const {
    latitude,
    longitude,
  } = useGeolocation();


  const { isLoading, data } = useQuery(
    ['validate_session'],
    async () => await me(access_token),
    {
      onSuccess: (data) => setUser(data),
    }
  )

  const { mutateAsync } = useMutation(
    'send_alert',
    async (data) => sendAlertMutation(data, access_token),
    {
      onSuccess: () => alert('Alerta Enviada'),
      onError: () => alert('Alerta No Enviada')
    }
  )

  const box = css([
    {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      zIndex: 1,
    },
  ])

  const message = css([
    {
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 1,
    },
  ])

  const sendAlert = async () => {
    await mutateAsync({
      lat: latitude,
      lng: longitude,
      user: user.id,
    })

    emailjs.send(
      "service_",
      "template_",
      {
        to_email: user.email,
        message: "Alerta enviada",
        from_name: 'Mujer Segura',
        to_name: user.fullName
      },
      {
        publicKey: '',
      }
    ).then((result) => {
      console.log(result);
    })
  }

  if (isLoading) return <Layout>Cargando...</Layout>

  return (
    <Layout user={data}>
      <Box css={box}>
        <Typography variant="h2" css={message}>
          No temas a reportar
        </Typography>
        <IconButton size="large" onClick={() => sendAlert()}>
          <PrivacyTipIcon
            sx={{ height: '10rem', width: '10rem' }}
            color="primary"
          />
        </IconButton>
      </Box>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const access_token = cookies.access_token

  if (!access_token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {
      access_token,
    },
  }
}

export default Index
