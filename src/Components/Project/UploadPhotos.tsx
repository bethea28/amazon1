import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../Resources/Constants";
import { deletePhoto, getProjectDetails, uploadPhoto } from "../../Services/ProjectService";

export default function UploadPhotos() {

    const { id } = useParams(); //projectId to Upload photos to
    const filename = "example_filename" //filename on a specific card

    const [preview, setPreview] = useState("");
    const [file, setFile] = useState("");
    const [disabledUpload, setDisabledUpload] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project>();

    useEffect(() => {
        const getData = async () => {
            const response = await getProjectDetails(id!);
            setCurrentProject(response);
            setPreview(response!.photoURLs[0])
        }

        if (!currentProject) {
            getData();
        }
    }, [currentProject]);

    function handleChange(e: any) {
        let fileChosen = URL.createObjectURL(e.target.files[0]);
        setPreview(fileChosen);
        setFile(e.target.files[0]);
    }

    const handleUpload = (e: React.MouseEvent<HTMLElement>) => {
        setDisabledUpload(true);
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData);
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        setDisabledDelete(true);
        deletePhoto(id!, filename);
        const noAvatar = "";
        setPreview(noAvatar);
    }

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = "../../Resources/Default_Image_Thumbnail.png";
        event.currentTarget.className = "error";
      };

    if (!currentProject) {
        return null;
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', border: 1, flexGrow: 1, margin: 2, }}>
            <Grid container spacing={2}>
            <Grid xs={12}>
                <Box sx={{ textAlign: 'left', margin: 2 }}><Typography variant="h4" m={1}>Upload a cover photo: </Typography></Box>
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
                </Box>
            </Grid>
            <Grid xs={9}>
                Progress bar
            </Grid>
            <Grid xs={3}>
                <Button 
                    className="uploadPhoto"
                    sx={{ margin: 1, backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25 }}
                    variant="contained" 
                    component="span"
                    disabled={disabledUpload}
                    onClick={handleUpload}
                >Upload</Button>
            </Grid>
            <Grid xs={5}>
                <Typography variant="h5" m={1}>Cover Photo: </Typography>
            </Grid>
            <Grid xs={7}>
                <Card sx={{ maxWidth: 1500 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        width="800"
                        image={preview}
                        onError={imageOnErrorHandler}
                        alt="Pot of plants"
                    />
                    <CardContent>
                        Filename
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            disabled={disabledDelete}
                            onClick={handleDelete}
                        >Delete</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ textAlign: 'left', margin: 2 }}><Typography variant="h4" m={1}>Upload up to 3 photos for your gallery: </Typography></Box>
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
                </Box>
            </Grid>
            <Grid xs={9}>
                Progress bar
            </Grid>
            <Grid xs={3}>
                <Button 
                    className="uploadPhoto"
                    sx={{ margin: 1, backgroundColor:"#A6BBA7", mt:1, height: 25 }}
                    variant="contained" 
                    component="span"
                    disabled={disabledUpload}
                    onClick={handleUpload}
                >Upload</Button>
            </Grid>
            <Grid xs={4}>
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        width="800"
                        image={preview}
                        onError={imageOnErrorHandler}
                        alt="Pot of plants"
                    />
                    <CardContent>
                        Filename
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            disabled={disabledDelete}
                            onClick={handleDelete}
                        >Delete</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={4}>
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        width="800"
                        image={preview}
                        onError={imageOnErrorHandler}
                        alt="Pot of plants"
                    />
                    <CardContent>
                        Filename
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            disabled={disabledDelete}
                            onClick={handleDelete}
                        >Delete</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={4}>
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        width="800"
                        image={preview}
                        onError={imageOnErrorHandler}
                        alt="Pot of plants"
                    />
                    <CardContent>
                        Filename
                        <Button className="deletePhoto"
                            sx={{ margin: 1, backgroundColor:"#FFF", mt:1, height: 25 }}
                            variant="contained" 
                            component="span"
                            disabled={disabledDelete}
                            onClick={handleDelete}
                        >Delete</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
  </Box>
  )    
}