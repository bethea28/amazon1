import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { CommentData } from "../../Resources/Constants";
import { theme } from "../../Resources/GlobalTheme";
import { formatDistanceToNowStrict as getTimeDistance } from "date-fns";

type Props = {
  comment: CommentData;
};

function Comment(props: Props) {
  return (
    <Paper sx={{ padding: "1em", mt: 3 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="user avatar" src={props.comment.avatarURL} />
        </Grid>
        <Grid item>
          <Typography variant="h6" textAlign={"left"}>
            {props.comment.username}
          </Typography>
          <Typography fontWeight={400} variant="body1" textAlign={"left"}>
            {props.comment.content}
          </Typography>
          <Typography
            color={theme.palette.primary.dark}
            variant="caption"
            display={"block"}
            fontStyle={"italic"}
            textAlign={"left"}
          >
            {getTimeDistance(new Date(props.comment.createdAt!))} ago
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Comment;
