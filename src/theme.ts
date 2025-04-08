import { createTheme } from '@mui/material/styles';

// Extend the PaletteOptions interface
declare module '@mui/material/styles' {
  interface Palette {
    sidebar: Palette['primary'];
  }
  interface PaletteOptions {
    sidebar: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#f70776",
    },
    secondary: {
      main: "#1976d2",
    },
    sidebar: {
      main: "#ecf9fc", 
    },
  },
});

export default theme;