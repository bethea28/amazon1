import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import CommentField from "../CommentField";

function CommentList() {

    return (
        <Box>
            <Typography margin={"0.5em"} textAlign={"left"} variant="h5">Comments ([amount])</Typography>
            <CommentField />
            <Paper sx={{padding: "1em", mt: 3}}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="user avatar" src="https://picsum.photos/250" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" textAlign={"left"}>[User username]</Typography>
                        <Typography fontWeight={400} variant="body1" textAlign={"left"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
                        <Typography color={green[300]} variant="caption" display={"block"} fontStyle={"italic"} textAlign={"right"}>[Comment creation time]</Typography>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    )
}

export default CommentList;