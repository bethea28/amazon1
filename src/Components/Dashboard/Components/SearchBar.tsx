import { Box, styled, Input } from "@mui/material";
import React, { useState } from "react";

function SearchBar() {

    const [search, setSearch] = useState("");

    const SearchField = styled(Input)({
        backgroundColor: "#E9E9E9",
        marginTop: "1em",
        padding: "0.5em 2em",
        border: "none",
        borderRadius: "20px",
        color: "#7B7D8C",
    })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Needs logic from project service for project search
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <SearchField fullWidth autoFocus value={search} onChange={(event) => setSearch(event.target.value)} type="search" disableUnderline={true} placeholder="Find a project or category" />
            </form>
        </Box>
    )
}

export default SearchBar;