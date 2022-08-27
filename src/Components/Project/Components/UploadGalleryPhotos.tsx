import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { photoPickerButton } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../../Resources/Constants";
import { deletePhoto, getProjectDetails, uploadPhoto } from "../../../Services/ProjectService";
import { CurrentProjectContext, ProjectData } from "../UploadPhotos";

export default function UploadGalleryPhotos() {

    // const { id } = useParams(); //projectId to Upload photos to
    const [file, setFile] = useState("");
    const currentProject = useContext<ProjectData>(CurrentProjectContext);
    const { id, photoURLs } = currentProject;
    // const [currentProject, setCurrentProject] = useState<Project>();
    // const { photoURLs } = currentProject! || {};
    const noPhoto = "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await getProjectDetails(id!);
    //         setCurrentProject(response);
    //     }

    //     if (!currentProject) {
    //         getData();
    //     }
    // }, [currentProject]);

    function handleChange(e: any) {
        setFile(e.target.files[0]);
    }

    const handleGalleryUpload = (e: React.MouseEvent<HTMLElement>) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData, false).then(
            (value) => {
                window.location.reload();
            },
            (reason) => {
                window.location.reload();
            }
        );
    }

    const handleGalleryDeleteOne = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[1].substring(photoURLs[1].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                window.location.reload();
            },
            (reason) => {
                window.location.reload();
            }
        );
    }

    const handleGalleryDeleteTwo = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[2].substring(photoURLs[2].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                window.location.reload();
            },
            (reason) => {
                window.location.reload();
            }
        );
    }

    const handleGalleryDeleteThree = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[3].substring(photoURLs[3].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                window.location.reload();
            },
            (reason) => {
                window.location.reload();
            }
        );
    }

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
        event.currentTarget.className = "error";
      };

    // if (!currentProject) {
    //     return null;
    // }

    return (
        <Grid container spacing={2} sx={{ justifyContent: 'center', boxShadow: 3, margin: 2, padding: 3 }}>
        <Grid xs={12}>
                <Box sx={{ textAlign: 'left', margin: 2 }}><Typography variant="h5" m={1}>Upload up to 3 photos for your gallery: </Typography></Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                    <TextField
                        fullWidth
                        id="outlined-full-width"
                        label="Photo Gallery Upload"
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
                        onClick={handleGalleryUpload}
                    >Upload</Button>
                </Box>
            </Grid>
            
            
            <Grid xs={4}>
                <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={photoURLs[1] || noPhoto}
                        onError={imageOnErrorHandler}
                        alt="Project photo"
                    />
                    <CardContent>
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            onClick={handleGalleryDeleteOne}
                        >Delete</Button>
                    </CardContent>
                </Card>
                </Box>
            </Grid>
            <Grid xs={4}>
                <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={photoURLs[2] || noPhoto}
                        onError={imageOnErrorHandler}
                        alt="Project photo"
                    />
                    <CardContent>
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            onClick={handleGalleryDeleteTwo}
                        >Delete</Button>
                    </CardContent>
                </Card>
                </Box>
            </Grid>
            <Grid xs={4}>
                <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={photoURLs[3] || noPhoto}
                        onError={imageOnErrorHandler}
                        alt="Project photo"
                    />
                    <CardContent>
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            onClick={handleGalleryDeleteThree}
                        >Delete</Button>
                    </CardContent>
                </Card>
                </Box>
            </Grid>
        </Grid>
    )
}