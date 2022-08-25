import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';

type Inputs = {
    commentContent: string
}

function CommentField() {

    const [comment, setComment] = useState("");
    const { register, handleSubmit } = useForm<Inputs>();
    const submitComment: SubmitHandler<Inputs> = (data) => {
        setComment("");
        console.log(data.commentContent);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(submitComment)}>
                <Grid container flexWrap={"nowrap"} alignItems={"center"} spacing={2}>
                    <Grid item marginLeft={2}>
                        <Avatar alt="user avatar" src="https://picsum.photos/250" />
                    </Grid>
                    <Grid width={"85%"} item>
                        <TextField
                            {...register("commentContent")}
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
                        <Button type="submit" disabled={!comment}>
                            <SendIcon />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default CommentField;