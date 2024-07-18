import { useContext, useEffect, useState } from 'react'

// Context
// import { Context } from 'context'

// Navigation
import { useRouter } from 'next/router'

// Cookies
import { destroyCookie } from 'nookies'

// Style Components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

const pages = [
  { name: 'Administrador', route: '/admin', role: 'admin' },
  { name: 'Mapa', route: '/incidents_map', role: 'admin' },
  { name: 'Historial', route: '/history', role: 'ciudadana' },
]
const options = [
  { name: 'Iniciar Sesión', route: '/login' },
  { name: 'Cerrar Sesión', route: '/logout' },
]

const Header = ({ user }) => {
  const router = useRouter()

  const logout = () => {
    destroyCookie(null, 'access_token')

    router.push('/login')
  }

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="absolute">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push('/')}
            sx={{
              mr: 2,
              cursor: 'pointer',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            MUJER SEGURA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(
                (page) =>
                  page.role === user.role && (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        handleCloseNavMenu()
                        router.push(page.route)
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(
              (page) =>
                page.role === user.role && (
                  <Button
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu()
                      router.push(page.route)
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                )
            )}
          </Box>

          <Typography
            variant="h6"
            noWrap
            onClick={() => router.push('/')}
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              cursor: 'pointer',
            }}
          >
            MUJER SEGURA
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar alt={user.fullName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key={1}
                onClick={() => {
                  handleCloseUserMenu()
                  logout()
                }}
              >
                <Typography textAlign="center">{options[1].name}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
