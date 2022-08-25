import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { CommentData, User } from "../../Resources/Constants";
import { theme } from "../../Resources/GlobalTheme"
import { getTimeAgo } from "../../Resources/DateFormatter"
import UserService from "../../Services/UserService";
import { AuthContext } from "../../Context/AuthProvider";

function Comment(comment: CommentData) {

    const [commentUsername, setCommentUsername] = useState<string>();
    const currentUser = useContext(AuthContext)

    useEffect(() => {
        const getCommentUsername = async () => {
            const { username }: User = await UserService.getUser(comment.userId, currentUser.token) as User;
            setCommentUsername(username);
        }

        getCommentUsername();
        console.log(comment.createdAt);
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
                    <Typography color={theme.palette.primary.dark} variant="caption" display={"block"} fontStyle={"italic"} textAlign={"left"}>{getTimeAgo(new Date(comment.createdAt))}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Comment;