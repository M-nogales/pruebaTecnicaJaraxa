import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ColorModeContext } from "./context/ColorModeContext";
import { useColorMode } from './hooks/useColorMode';
import { Navbar } from "./components/Navbar";
import { DrugList } from "./components/DrugList";
import { DrugDetail } from "./components/DrugDetail";
import Footer from "./components/Footer";

const App = () => {
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
          <Footer/>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;