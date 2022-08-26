import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { photoPickerButton } from "aws-amplify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../../Resources/Constants";
import { deletePhoto, getProjectDetails, uploadCoverPhoto, uploadPhoto } from "../../../Services/ProjectService";

export default function UploadGalleryPhotos() {

    const { id } = useParams(); //projectId to Upload photos to
    const [firstGalleryPhoto, setFirstGalleryPhoto] = useState("");
    const [secondGalleryPhoto, setSecondGalleryPhoto] = useState("");
    const [thirdGalleryPhoto, setThirdGalleryPhoto] = useState("");
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

    const handleGalleryUploadOne = (e: React.MouseEvent<HTMLElement>) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData).then(
            (value) => {
                setFirstGalleryPhoto(photoURLs[1]);
            },
            (reason) => {
                setFirstGalleryPhoto(noPhoto);
            }
        );
    }

    const handleGalleryUploadTwo = (e: React.MouseEvent<HTMLElement>) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData).then(
            (value) => {
                setSecondGalleryPhoto(photoURLs[2]);
            },
            (reason) => {
                setSecondGalleryPhoto(noPhoto);
            }
        );
    }

    const handleGalleryUploadThree = (e: React.MouseEvent<HTMLElement>) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData).then(
            (value) => {
                setThirdGalleryPhoto(photoURLs[3]);
            },
            (reason) => {
                setThirdGalleryPhoto(noPhoto);
            }
        );
    }

    const handleDeleteFirst = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[1].substring(photoURLs[1].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                setFirstGalleryPhoto(noPhoto);
            },
            (reason) => {
                setFirstGalleryPhoto(photoURLs[1])
            }
        );
    }

    const handleDeleteSecond = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[2].substring(photoURLs[2].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                setSecondGalleryPhoto(noPhoto);
            },
            (reason) => {
                setSecondGalleryPhoto(photoURLs[2])
            }
        );
    }

    const handleDeleteThird = (e: React.MouseEvent<HTMLElement>) => {
        const filename = photoURLs[3].substring(photoURLs[3].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                setThirdGalleryPhoto(noPhoto);
            },
            (reason) => {
                setThirdGalleryPhoto(photoURLs[3])
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
                        onClick={handleGalleryUploadOne}
                    >Upload</Button>
                </Box>
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
                        onClick={handleGalleryUploadTwo}
                    >Upload</Button>
                </Box>
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
                        onClick={handleGalleryUploadThree}
                    >Upload</Button>
                </Box>
            </Grid>
            
            
            <Grid xs={4}>
                <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        width="300"
                        image={firstGalleryPhoto || photoURLs[1]}
                        onError={imageOnErrorHandler}
                        alt="Project photo"
                    />
                    <CardContent>
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            onClick={handleDeleteFirst}
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
                        height="500"
                        width="300"
                        image={secondGalleryPhoto || photoURLs[2]}
                        onError={imageOnErrorHandler}
                        alt="Project photo"
                    />
                    <CardContent>
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            onClick={handleDeleteSecond}
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
                        height="500"
                        width="300"
                        image={thirdGalleryPhoto || photoURLs[3]}
                        onError={imageOnErrorHandler}
                        alt="Project photo"
                    />
                    <CardContent>
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            onClick={handleDeleteThird}
                        >Delete</Button>
                    </CardContent>
                </Card>
                </Box>
            </Grid>
        </Grid>
    )
}