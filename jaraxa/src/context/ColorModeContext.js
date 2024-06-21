import { createContext } from 'react';

// apart of app.jsx to prevent vite + swc errors + more organization

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
