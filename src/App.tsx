import Sha256d from "./pages/sha256d";
import {
    BrowserRouter as Router,
    Route,
    Link, Routes
} from "react-router-dom";
import {useState} from "react";
import React from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider, Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, Typography
} from "@mui/material";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {Home} from "./pages/Home";


const drawerWidth = 240;
function App() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>

                <ListItem>
                    <ListItemButton component={Link} to={"/"}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Index" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={Link} to={"/sha256d"}>
                        <ListItemIcon>
                            <EnhancedEncryptionIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Sha256d" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )

    const container = window !== undefined ? () => window.document.body : undefined;


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Bitcoin Header Tools
                    </Typography>
                </Toolbar>
            </AppBar>
        <Router basename={"/online-tools"}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/sha256d"} element={<Sha256d />} />
                </Routes>
            </Box>
        </Router>
        </Box>
    );
}

export default App;
