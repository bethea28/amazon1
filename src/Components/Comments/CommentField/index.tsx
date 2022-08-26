import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../../../Context/AuthProvider";
import { User } from "../../../Resources/Constants";
import UserService from "../../../Services/UserService";
import { useParams } from "react-router-dom";
import { postComment } from "../../../Services/CommentService";

type Inputs = {
    commentContent: string
}

function CommentField() {

    const [comment, setComment] = useState<string>();
    const [userAvatar, setUserAvatar] = useState<string>();
    const currentUser = useContext(AuthContext);
    const { id } = useParams();
    const { register, handleSubmit } = useForm<Inputs>();


    useEffect(() => {
        const getUserAvatar = async () => {
            const { avatarURL }: User = await UserService.getUser(currentUser.id) as User;
            setUserAvatar(avatarURL);
        }
        console.log("UseEffect fired")

        getUserAvatar();
    }, [userAvatar])

    const submitComment: SubmitHandler<Inputs> = async (data) => {
        console.log(data.commentContent);
        postComment({
            content: data.commentContent,
            userId: currentUser.id,
            projectId: id!
        }, currentUser.token)
        setComment("");
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(submitComment)}>
                <Grid container flexWrap={"nowrap"} alignItems={"center"} spacing={2}>
                    <Grid item marginLeft={2}>
                        <Avatar alt="user avatar" src={userAvatar} />
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