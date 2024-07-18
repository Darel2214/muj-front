import { useEffect, useContext } from 'react'

import nookies from 'nookies'
import Axios from 'axios'

import { Box, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// Components
import Layout from '../../components/layout/index.js'

const data = []

const columns = [
  {
    field: 'fullName',
    headerName: 'Nombre Completo',
    width: 200,
    valueGetter: (params) => `${params.row.user.fullName}`,
  },
  {
    field: 'phoneNumber',
    headerName: 'Numero de Telefono',
    width: 200,
    valueGetter: (params) => `${params.row.user.phoneNumber}`,
  },
  {
    field: 'lat',
    headerName: 'Latitud',
    width: 200,
  },
  {
    field: 'lng',
    headerName: 'Longitud',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de Creación',
    width: 300,
  },
]

const History = ({ user, alerts, access_token }) => {
  return (
    <Layout page="history" user={user}>
      <Container maxWidth="lg" sx={{ zIndex: 1 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            height: '70vh',
            width: '100%',
            borderRadius: '3px',
            padding: '5px',
          }}
        >
          <DataGrid rows={alerts} columns={columns} />
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const access_token = cookies.access_token
  let user = null
  let alerts = []

  await Axios.get(`${process.env.NEXT_APP_BACKEND_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => {
      user = response.data
    })
    .catch(() => {})

  await Axios.get(
    `${process.env.NEXT_APP_BACKEND_URL}/alerts/byId/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
    .then((response) => {
      alerts = response.data
    })
    .catch(() => {})

  if (!user) {
    ctx.res.writeHead(307, { location: '/login' })
    ctx.res.end()
    return { props: {} }
  }

  return {
    props: {
      user,
      alerts,
      access_token,
    },
  }
}

export default History
