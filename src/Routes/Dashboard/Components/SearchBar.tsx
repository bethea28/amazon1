import { Box, TextField } from "@mui/material";
import React from "react";

function SearchBar() {
    return (
        <Box>
            <TextField margin="normal" variant="filled" placeholder="Find a project or category" />
        </Box>
    )
}

export default SearchBar;