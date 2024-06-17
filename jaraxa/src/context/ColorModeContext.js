import { createContext } from 'react';

// coment apartado de app.jsx debido a organización y evitar problemas con vite + swc

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
