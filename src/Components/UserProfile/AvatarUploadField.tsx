
import { Box, TextField, Avatar, Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import UserService from '../../Services/UserService';
import { noAvatarUrl } from '../../Resources/constants';

interface Props {
    avatarURL: string;
}

export default function AvatarUploadField({ avatarURL }: Props) {

    const { id, token } = useContext(AuthContext);
    const initialAvatar = avatarURL ? avatarURL : noAvatarUrl;
    const [preview, setPreview] = useState(initialAvatar);
    const [file, setFile] = useState("");
    const [disabledSave, setDisabledSave] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);

    /**
     * onLoad display the image of the avatar associated with current user
     */
    useEffect(() => {
        setPreview(initialAvatar);
    }, [initialAvatar]);

    /**
     * This handler changes the image displayed and file to be saved based on the image chosen to be saved.
     * Event type is any for now for file useState to be data types File, String, or Blob.
     */
    function handleChange(e: any) {

        let fileChosen = URL.createObjectURL(e.target.files[0]);
        setPreview(fileChosen);
        setFile(e.target.files[0]);
    }

    /**
     * This handler uploads photo chosen to the backend
     */
    const handleUpload = (e: React.MouseEvent<HTMLElement>) => {

        setDisabledSave(true);
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        UserService.uploadAvatar(id, token, bodyFormData).then(
            (value) => {
                window.location.reload();
            },
            (reason) => {
                window.location.reload();
            }
        );
    }

    /**
     * This handler deletes the current photo saved in the backend and resets the preview image to the default no avatar image
     */
    const handleDeleteAvatar = (e: React.MouseEvent<HTMLElement>) => {

        setDisabledDelete(true);
        UserService.deleteAvatar(id, token).then(
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
        event.currentTarget.src = noAvatarUrl;
        event.currentTarget.className = "error";
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                    alt="Profile Image"
                    src={preview}
                    onError={imageOnErrorHandler}
                    sx={{ width: 60, height: 60 }}
                />
                <TextField
                    fullWidth
                    id="outlined-full-width"
                    label="Avatar Upload"
                    style={{ margin: 4 }}
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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button className="uploadAvatar"
                    sx={{ backgroundColor: "#A6BBA7", color: "#000000", height: 25, mx: 1 }}
                    variant="contained"
                    component="span"
                    disabled={disabledSave}
                    onClick={handleUpload}
                >
                    Save Avatar
                </Button>
                <Button className="deleteAvatar"
                    sx={{ backgroundColor: "#A6BBA7", color: "#000000", height: 25 }}
                    variant="contained"
                    component="span"
                    disabled={disabledDelete}
                    onClick={handleDeleteAvatar}
                >
                    Delete Avatar
                </Button>
            </Box>
        </Box>
    )
}