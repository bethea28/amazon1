import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

function CommentField() {

    const [comment, setComment] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
       // Need logic for backend
    }

    return (
        <Box>
            <Grid container flexWrap={"nowrap"} alignItems={"center"} spacing={2}>
                <Grid item marginLeft={2}>
                    <Avatar alt="user avatar" src="https://picsum.photos/250" />
                </Grid>
                <Grid item width={"84%"}>
                    <TextField
                        fullWidth
                        multiline
                        margin="dense"
                        variant="outlined"
                        maxRows={4}
                        value={comment}
                        placeholder={"Add a comment"}
                        onChange={(event) => setComment(event.target.value)} />
                </Grid>
                <Grid item margin={0} padding={0}>
                    <Button onClick={handleSubmit}>
                        <SendIcon />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CommentField;