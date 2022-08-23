import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { getProjectComments } from "../../../Services/CommentService";
import CommentField from "../CommentField";
import { CommentData, tempProjectID } from "../../../Resources/Constants"
import { AuthContext } from "../../../Context/AuthProvider";
import Comment from "../Comment";

function CommentList() {

    const [commentList, setCommentList] = useState<CommentData[]>();
    const user = useContext(AuthContext);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await getProjectComments(tempProjectID);
            setCommentList(response!);
            
        }

        if (!commentList) {
            fetchComments();
        }

        console.log(user);
    }, [commentList])

    return (
        <Box>
            {commentList && 
            <Box>
                <Typography margin={"0.5em"} textAlign={"left"} variant="h5">Comments ({commentList.length})</Typography>
                <CommentField />
                {commentList.map((comment: CommentData) => <Comment key={comment.id} {...comment}/>)}
            </Box>}
        </Box>
    )
}

export default CommentList;