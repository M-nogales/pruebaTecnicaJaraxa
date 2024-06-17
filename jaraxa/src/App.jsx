import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Navbar } from "./components/Navbar";
import { DrugList } from "./components/DrugList";
import { DrugDetail } from "./components/DrugDetail";
import { ColorModeContext } from "./context/ColorModeContext";
import { useColorMode } from './hooks/useColorMode';

const App = () => {
  // coment hook que contiene toda la lógica del theme switch con material UI
  const { colorMode, theme } = useColorMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<DrugList />} />
            <Route path="/drug/:drugId" element={<DrugDetail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;