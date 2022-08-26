import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { photoPickerButton } from "aws-amplify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../Resources/Constants";
import { theme } from "../../Resources/GlobalTheme";
import { deletePhoto, getProjectDetails, uploadPhoto } from "../../Services/ProjectService";
import UploadGalleryPhotos from "./Components/UploadGalleryPhotos";

export default function UploadPhotos() {

    const { id } = useParams();
    const [coverPhoto, setCoverPhoto] = useState("");
    const [file, setFile] = useState("");
    const [currentProject, setCurrentProject] = useState<Project>();
    const { photoURLs } = currentProject! || {};
    const noPhoto = "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";

    useEffect(() => {
        const getData = async () => {
            const response = await getProjectDetails(id!);
            setCurrentProject(response);
        }

        if (!currentProject) {
            getData();
        }
    }, [currentProject]);

    function handleChange(e: any) {
        setFile(e.target.files[0]);
    }

    const handleCoverUpload = (e: React.MouseEvent<HTMLElement>) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData, true).then(
            (value) => {
                setCoverPhoto(photoURLs[0]);
            },
            (reason) => {
                setCoverPhoto(noPhoto);
            }
        );
    }

    const handleDeleteCover = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[0].substring(photoURLs[0].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                setCoverPhoto(noPhoto);
            },
            (reason) => {
                setCoverPhoto(photoURLs[0])
            }
        );
    }

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
        event.currentTarget.className = "error";
      };

    if (!currentProject) {
        return null;
    }

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', border: 0, flexGrow: 1, flexDirection: 'column', margin: 2, padding: 3, justifyContent: 'center' }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center', boxShadow: 3, margin: 2, padding: 3 }}>
                    <Grid xs={12}>
                        <Box sx={{ textAlign: 'left', margin: 2 }}><Typography variant="h5" m={1}>Upload a cover photo: </Typography></Box>
                        <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
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
                                sx={{ margin: 1, backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 50 }}
                                variant="contained" 
                                component="span"
                                onClick={handleCoverUpload}
                            >Upload</Button>
                        </Box>
                    </Grid>
                    
                    <Grid xs={5}>
                        <Typography variant="h6" m={1}>Cover Photo: </Typography>
                    </Grid>
                    <Grid xs={7}>
                        <Card sx={{ maxWidth: 800 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                width="800"
                                image={coverPhoto || photoURLs[0]}
                                onError={imageOnErrorHandler}
                                alt="Project photo"
                            />
                            <CardContent>
                                <Button className="deletePhoto"
                                    sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                                    variant="contained" 
                                    component="span"
                                    onClick={handleDeleteCover}
                                >Delete</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            <UploadGalleryPhotos />
            </Box>
        </ThemeProvider>
  )    
}