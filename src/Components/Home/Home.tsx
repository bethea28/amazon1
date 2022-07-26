import { Box } from "@mui/material";
import CommentList from "../../Routes/Project/Components/Comments/CommentList";
import AppbarPrivate from "../Navbar/AppbarPrivate";
import AppbarPublic from "../Navbar/AppbarPublic";

export default function Home() {

  return (
    <Box>
      <AppbarPublic />
      <CommentList/>
    </Box>
  );
}