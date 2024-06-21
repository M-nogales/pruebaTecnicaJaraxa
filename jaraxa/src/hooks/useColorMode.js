import { useState, useCallback, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// custom hook created to change themes
export const useColorMode = () => {
  const [mode, setMode] = useState("light");

  // toggle color mode with useCallBack for more sugar
  // useCallback == useMemo, useCallback just for functions
  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  // create theme based on material UI doc https://mui.com/material-ui/customization/dark-mode/
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
