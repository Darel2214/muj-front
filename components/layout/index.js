/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

// Themming
import { useTheme } from '@mui/system'
import Header from './header.js'

const Layout = ({ children, _, user }) => {
  const theme = useTheme()

  const bg = css([
    {
      '::before': {
        content: '" "',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.7,
      },
    },
    {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage:
        'url(/image/bg-image.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
    },
  ])

  // -> URL BG Image ->'url(https://images.hdqwalls.com/wallpapers/beautiful-women-4k-nd.jpg)',

  return (
    <div>
      {user && <Header user={user} />}
      <main css={bg}>{children}</main>
    </div>
  )
}

export default Layout
