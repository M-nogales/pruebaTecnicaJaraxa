import { useState, useCallback, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const useColorMode = () => {
  const [mode, setMode] = useState('light');

  // coment toggle color mode con useCallBack para sugar
  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  // coment create theme based on material UI doc https://mui.com/material-ui/customization/dark-mode/
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return { colorMode, theme };
};
