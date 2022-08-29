
import { Box, TextField, Avatar, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

export default function AvatarUploadField() {

    const [preview, setPreview] = useState("");
    const [file, setFile] = useState("");
    const [disabledSave, setDisabledSave] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);
    const { id, token } = useContext(AuthContext);
    const filename = id;

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

        /**
         * Allows the iamge file to be transferred to the backend via form data
         */
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadAvatar(id, token, bodyFormData);
    }

    /**
     * This handler deletes the current photo saved in the backend and resets the preview image to the default no avatar image
     */
    const handleDeleteAvatar = (e: React.MouseEvent<HTMLElement>) => {
        setDisabledDelete(true);
        deleteAvatar(userId, filename);
        const noAvatar = "";
        setPreview(noAvatar);
        setFile(noAvatar);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', border: 1 }}>
            <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                <Avatar
                    alt="Profile Image"
                    src={preview}
                    sx={{ width: 75, height: 75 }}
                />
                <TextField
                    fullWidth
                    id="outlined-full-width"
                    label="Avatar Upload"
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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button className="uploadAvatar"
                    sx={{ margin: 1, backgroundColor: "#A6BBA7", color: "#000000", mt: 1, height: 25 }}
                    variant="contained"
                    component="span"
                    disabled={disabledSave}
                    onClick={handleUpload}
                >
                    Save Avatar
                </Button>
                <Button className="deleteAvatar"
                    sx={{ margin: 1, backgroundColor: "#A6BBA7", color: "#000000", mt: 1, height: 25 }}
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