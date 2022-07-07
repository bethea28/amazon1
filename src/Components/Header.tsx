import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import React from "react";

function Header() {
    return (
        <Box>
            {/* <Typography>Jumpstarter</Typography> */}
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" sx={{flexGrow: 1, textAlign: "left", fontWeight: 600}}>Jumpstarter</Typography>
                        <Button color="secondary">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    )
}

export default Header;