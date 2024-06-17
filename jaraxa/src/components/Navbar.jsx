import { useContext } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '../context/ColorModeContext';

export const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Jaraxa</Link></li>
        <li>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </li>
      </ul>
    </nav>
  );
};
