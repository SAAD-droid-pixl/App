import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Slider, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChromePicker } from 'react-color';
import DrawingPad from './DrawingPad';

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeMode, setThemeMode] = useState('light');
  const [penColor, setPenColor] = useState('#000');
  const [penWidth, setPenWidth] = useState(5);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handlePenColorChange = (color) => {
    setPenColor(color.hex);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Multi-Tools App
          </Typography>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={toggleTheme}>Toggle Theme</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Background Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <DrawingPad penColor={penColor} penWidth={penWidth} />

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Pen Settings</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Pen Width</Typography>
            <Slider
              value={penWidth}
              min={1}
              max={20}
              onChange={(e, newValue) => setPenWidth(newValue)}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography>Pen Color</Typography>
            <ChromePicker color={penColor} onChangeComplete={handlePenColorChange} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
