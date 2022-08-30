
import { Box, TextField, Avatar, Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import UserService from '../../Services/UserService';
import { noAvatarUrl } from '../../Resources/Constants';
import { useForm } from "react-hook-form";

interface Props {
    avatarURL: string;
}

export default function AvatarUploadField({ avatarURL }: Props) {

    const initialData = {
        avatarURL: avatarURL
    }

    const { id, token } = useContext(AuthContext);
    const [preview, setPreview] = useState(initialData);
    const [file, setFile] = useState("");
    const [disabledSave, setDisabledSave] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);
    const { register, handleSubmit, reset } = useForm<Props>();

    /**
     * onLoad display the image of the avatar associated with current user
     */
    useEffect(() => {
        console.log("AVATAR", avatarURL);
        setPreview(initialData);
    }, [preview]);

    /**
     * This handler changes the image displayed and file to be saved based on the image chosen to be saved.
     * Event type is any for now for file useState to be data types File, String, or Blob.
     */
    function handleChange(e: any) {
        let fileChosen = URL.createObjectURL(e.target.files[0]);
        console.log("PREVIEW", fileChosen);
        setPreview(prevState => {
            return { ...prevState, avatarURL: fileChosen };
        });
        setFile(e.target.files[0]);
    }

    /**
     * This handler uploads photo chosen to the backend
     */
    const onSubmit = handleSubmit(async (data: Props) => {
        setDisabledSave(true);
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        await UserService.uploadAvatar(id, token, bodyFormData);
    })

    /**
     * This handler deletes the current photo saved in the backend and resets the preview image to the default no avatar image
     */
    const handleDeleteAvatar = (e: React.MouseEvent<HTMLElement>) => {
        setDisabledDelete(true);
        UserService.deleteAvatar(id, token);
        setPreview(prevState => {
            return { ...prevState, avatarURL: noAvatarUrl };
        });
        const noAvatar = "";
        setFile(noAvatar);
    }

    if (!avatarURL) {
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        alt="Profile Image"
                        src={preview?.avatarURL}
                        sx={{ width: 75, height: 75 }}
                    />
                    <TextField {...register('avatarURL')}
                        fullWidth
                        id="outlined-full-width"
                        label="Avatar Upload"
                        style={{ margin: 4 }}
                        value=''
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
                        onClick={onSubmit}
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
        </form>
    )
}