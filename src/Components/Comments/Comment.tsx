import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { CommentData, GetUserResponse } from "../../Resources/Constants";
import { getUser } from "../../Services/UserService";
import { theme } from "../../Resources/GlobalTheme"

function Comment(comment: CommentData) {

    const [commentUsername, setCommentUsername] = useState<string>();

    useEffect(() => {
        const getCommentUsername = async () => {
            const { username }: GetUserResponse = await getUser(comment.userId) as GetUserResponse;
            setCommentUsername(username);
        }

        getCommentUsername();
        const date = new Date(comment.createdAt)
        const dateMS = date.getTime()
        console.log(comment.createdAt);
        console.log(dateMS);
    }, [commentUsername])

    return (
        <Paper sx={{ padding: "1em", mt: 3 }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="user avatar" src="https://picsum.photos/250" />
                </Grid>
                <Grid item>
                    <Typography variant="h6" textAlign={"left"}>{commentUsername}</Typography>
                    <Typography fontWeight={400} variant="body1" textAlign={"left"}>{comment.content}</Typography>
                    <Typography color={theme.palette.primary.dark} variant="caption" display={"block"} fontStyle={"italic"} textAlign={"right"}>{comment.createdAt}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Comment;