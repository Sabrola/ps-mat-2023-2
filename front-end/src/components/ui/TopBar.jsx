import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../assets/karangos-logo-600px.png'
import MainMenu from './MainMenu'
import myfetch from '../../utils/myfetch'
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TopBar() {

  const [loggedInUser, setLoggedInUser] = React.useState(null)

  //useEffect() para ser executado quando componente carrega
  React.useEffect(() => {
    fetchLoggedInUser()
  }, [])

  async function fetchLoggedInUser() {
    try {
      const user = myfetch.get('user/loggedIn')
      setLoggedInUser(user)
    } catch(error) {
      setLoggedInUser({email: `[${error.status}]`})
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark sx={ {justifyContent: 'space-between', flexDirection: 'row'} }>
        <Toolbar variant="dense">
          

          <MainMenu />

          <img src={logo} alt="Logotipo Karangos" style={{ width: '300px' }} />
        </Toolbar>
        <Button variant="text" startIcon={ <PersonIcon/> }>
          {loggedInUser?.email}
        </Button>
      </AppBar>
    </Box>
  );
}