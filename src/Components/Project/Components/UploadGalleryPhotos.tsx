import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { deletePhoto, uploadPhoto } from "../../../Services/ProjectService";
import { CurrentProjectContext, ProjectData } from "../UploadPhotos";
import { noPhoto } from "../../../Resources/Constants";

export default function UploadGalleryPhotos() {

    const [file, setFile] = useState("");
    const currentProject = useContext<ProjectData>(CurrentProjectContext);
    const { id, photoURLs } = currentProject;

    /**
     * Set the file to the file user chooses on their window
     */
    function handleChange(e: any) {
        setFile(e.target.files[0]);
    }

    /**
     * When the user clicks the upload button, send the file to the BE
     */
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

    /**
     * When the user clicks the delete button, delete the file from the BE
     */
    const handleGalleryDelete = (e: React.MouseEvent<HTMLElement>, index: number) => {
        const filename = photoURLs[index].substring(photoURLs[index].lastIndexOf("/") + 1);
        deletePhoto(id!, filename).then(
            (value) => {
                window.location.reload();
            },
            (reason) => {
                window.location.reload();
            }
        );
    }

    /**
     * Default image when no image is available or cannot be uploaded
     */
    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        event.currentTarget.src = "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
        event.currentTarget.className = "error";
    };

    return (
        <Grid container spacing={2} sx={{ justifyContent: 'center', boxShadow: 3, margin: 2, padding: 3 }}>
            <Grid item xs={12}>
                <Box sx={{ textAlign: 'left', margin: 2 }}><Typography variant="h5" m={1}>Upload up to 3 more photos for your gallery: </Typography></Box>
            </Grid>
            <Grid item xs={12}>
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
                        sx={{ margin: 1, backgroundColor: "#A6BBA7", color: "#000000", mt: 1, height: 50 }}
                        variant="contained"
                        component="span"
                        onClick={handleGalleryUpload}
                    >Upload</Button>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ textAlign: 'left', margin: 2 }}><Typography variant="h6" m={1}>Current cover photo: </Typography></Box>
            </Grid>
            {photoURLs.map((a, index) => {
                return (
                    <Grid item xs={4}>
                        <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                            <Card sx={{ maxWidth: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    width="200"
                                    image={a || noPhoto}
                                    onError={imageOnErrorHandler}
                                    alt="Project photo"
                                />
                                <CardContent>
                                    <Button className="deletePhoto"
                                        sx={{ margin: 1, backgroundColor: "#000", mt: 1, height: 25 }}
                                        variant="contained"
                                        component="span"
                                        onClick={(e: React.MouseEvent<HTMLElement>) => handleGalleryDelete(e, index)}
                                    >Delete</Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    )
}