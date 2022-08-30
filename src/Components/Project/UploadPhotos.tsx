import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project, noPhoto } from "../../Resources/constants";
import { theme } from "../../Resources/GlobalTheme";
import {
  deletePhoto,
  getProjectDetails,
  uploadPhoto,
} from "../../Services/ProjectService";
import UploadGalleryPhotos from "./Components/UploadGalleryPhotos";

export type ProjectData = {
  id: string | undefined;
  photoURLs: string[];
};

const initialData: ProjectData = {
  id: "",
  photoURLs: [""],
};

export const CurrentProjectContext = createContext<ProjectData>(initialData);

export default function UploadPhotos() {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [currentProject, setCurrentProject] = useState<Project>();
  const { photoURLs } = currentProject! || {};

  useEffect(() => {
    const getData = async () => {
      const response = await getProjectDetails(id!);
      setCurrentProject(response);
    };

    if (!currentProject) {
      getData();
    }
  }, [currentProject]);

  /**
   * Set the file to the file user chooses on their window
   */
  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  /**
   * When the user clicks the upload button, send the file to the BE
   */
  const handleCoverUpload = (e: React.MouseEvent<HTMLElement>) => {
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    uploadPhoto(id!, bodyFormData, true).then(
      (value) => {
        window.location.reload();
      },
      (reason) => {
        window.location.reload();
      }
    );
  };

  /**
   * When the user clicks the delete button, delete the file from the BE
   */
  const handleDeleteCover = (e: React.MouseEvent<HTMLElement>) => {
    const filename = photoURLs[0].substring(photoURLs[0].lastIndexOf("/") + 1);
    deletePhoto(id!, filename).then(
      (value) => {
        window.location.reload();
      },
      (reason) => {
        window.location.reload();
      }
    );
  };

  /**
   * Default image when no image is available or cannot be uploaded
   */
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = noPhoto;
    event.currentTarget.className = "error";
  };

  if (!currentProject) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          border: 0,
          flexGrow: 1,
          flexDirection: "column",
          margin: 2,
          padding: 3,
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", boxShadow: 3, margin: 2, padding: 3 }}
        >
          <Grid item xs={12}>
            <Box sx={{ textAlign: "left", margin: 2 }}>
              <Typography variant="h5" m={1}>
                Upload a cover photo:{" "}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", margin: 2, justifyContent: "center" }}>
              <TextField
                fullWidth
                id="outlined-full-width"
                label="Cover Photo Upload"
                style={{ margin: 8 }}
                name="upload-photo"
                type="file"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                className="uploadPhoto"
                sx={{
                  margin: 1,
                  backgroundColor: "#A6BBA7",
                  color: "#000000",
                  mt: 1,
                  height: 50,
                }}
                variant="contained"
                component="span"
                onClick={handleCoverUpload}
              >
                Upload
              </Button>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h6" m={1}>
              Cover Photo:{" "}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Card sx={{ maxWidth: 800 }}>
              <CardMedia
                component="img"
                height="500"
                width="800"
                image={photoURLs[0] || noPhoto}
                onError={imageOnErrorHandler}
                alt="Project photo"
              />
              <CardContent>
                <Button
                  className="deletePhoto"
                  sx={{ margin: 1, backgroundColor: "#000", mt: 1, height: 25 }}
                  variant="contained"
                  component="span"
                  onClick={handleDeleteCover}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <CurrentProjectContext.Provider value={{ id, photoURLs }}>
          <UploadGalleryPhotos />
        </CurrentProjectContext.Provider>
      </Box>
    </ThemeProvider>
  );
}
