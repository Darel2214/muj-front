/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import nookies from 'nookies'

import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { alertsByStatus, me } from '../../api/queries';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { Button } from '@mui/material';
import { updateAlertMutation } from '../../api/mutations';

const IncidentsMap = ({ access_token }) => {

  const [user, setUser] = useState(null)

  const router = useRouter();

  const { isLoading: isMeLoading } = useQuery(
    ['validate_session'],
    async () => await me(access_token),
    {
      onSuccess: (data) => setUser(data),
      onError: () => {
        destroyCookie(null, 'access_token')
        router.push('/login')
      }
    },
  )

  const { data: alerts, isLoading: isAlertsLoading } = useQuery(
    ['alerts'],
    async () => await alertsByStatus(access_token, true),
    {
      refetchInterval: 1000
    }
  )

  const container = css({
    height: '100vh',
    width: '100vw !important',
    maxWidth: '100vw !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '0 !important',
  })

  const alertsPanel = css({
    height: '500px',
    width: '300px',
    position: 'absolute',
    backgroundColor: 'white',
    left: '1rem',
    top: '6rem',
    overflowY: 'scroll',
  })

  const alertInPanel = css({
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    color: 'black',
  })

  const { mutateAsync } = useMutation(
    ['updated_alert'],
    async (data) => await updateAlertMutation({ id: data.id, status: false }, access_token),
    {
      onSuccess: () => alert('Alerta Actualizada'),
      onError: () => alert('Alerta No Actualizada'),
    }
  )


  if (isMeLoading) return <Layout>Cargando...</Layout>

  const handleAcceptAlert = async (alert) => {
    await mutateAsync({ id: alert.id })
  }

  return (
    <Layout user={user}>
      <div css={container}>
        <Map
          height="100%"
          defaultCenter={[-0.9500222, -80.7162]}
          defaultZoom={13}
        >
          {
            isAlertsLoading ? <div>Cargando...</div> : alerts.map((alert) => (
              <Marker
                key={alert.id}
                width={50}
                anchor={[Number(alert.lat), Number(alert.lng)]}
                onClick={() => alert(`Alerta: ${alert.id}`)}
                color='red'
              />
            ))
          }
          {
            isAlertsLoading ? <div>Cargando...</div> : alerts.map((alert) => (
              <Overlay anchor={[Number(alert.lat), Number(alert.lng)]} offset={[0, 250]} key={`overlay-${alert.id}`}>
                <div css={alertInPanel} style={{ width: '200px', backgroundColor: 'white' }}>
                  <h4>Alerta: {alert.id}</h4>
                  <p>Usuario: {alert.user.fullName}</p>
                  <div style={{ width: '100%' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      style={{ width: '100%' }}
                      onClick={() => handleAcceptAlert(alert)}
                    >
                      Atender
                    </Button>
                  </div>
                </div>
              </Overlay>
            ))
          }

          <ZoomControl />
        </Map>
        <div css={alertsPanel}>
          {
            isAlertsLoading ? <div>Cargando...</div> : alerts.map((alert) => (
              <div key={alert.id} css={alertInPanel}>
                <h2>Alerta: {alert.id}</h2>
                <p>Latitud: {alert.lat}</p>
                <p>Longitud: {alert.lng}</p>
                <p>Usuario: {alert.user.fullName}</p>
                <p>CI: {alert.user.dni}</p>
                <p>Tel: <a href={`tel:+593${alert.user.phoneNumber}`}>{alert.user.phoneNumber}</a></p>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const access_token = cookies.access_token

  if (!access_token) {
    ctx.res.writeHead(307, { location: '/login' })
    ctx.res.end()
    return { props: {} }
  }

  return {
    props: {
      access_token,
    },
  }
}

export default IncidentsMap;