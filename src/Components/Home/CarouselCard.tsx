import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { Project } from "../../Resources/constants";
import { useNavigate } from "react-router-dom";
import ViewProfile from "../UserProfile/ViewProfile";
import LinearProgressLine from "../Home/LinearProgressLine";

interface Props {
  project: Project;
}

export default function CarouselCard({ project }: Props) {
  const navigate = useNavigate();

  const navigateTo = (page: string) => {
    const pageLink = `/projects/${page}`;
    navigate(pageLink);
  };

  const defaultImage = "https://picsum.photos/200/300";

  const getPhotoUrl = (photoUrl: string[]) => {
    if (photoUrl && photoUrl.length > 0) {
      return photoUrl[0];
    }
    return defaultImage;
  };

  const styles = {
    Card: {
      width: 400,
      margin: "auto",
    },
    media: {},
  };

  const {
    projectId,
    photoURLs,
    totalFundedNum,
    targetFundingNum,
    projectName,
    userId,
    description,
  } = project;
  return (
    <Card
      sx={{ maxWidth: 440, height: 400, margin: "auto" }}
      onClick={() => navigateTo(projectId)}
    >
      <CardMedia
        component="img"
        height="200"
        image={getPhotoUrl(photoURLs)}
        alt="image"
        style={styles.media}
      />
      <CardContent>
        <LinearProgressLine />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontFamily={"sans-serif"}
        >
          {projectName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily={"sans-serif"}
        >
          {description}
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{ alignItems: "left" }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{<ViewProfile userId={userId} />}</Button>
      </CardActions>
    </Card>
  );
}
