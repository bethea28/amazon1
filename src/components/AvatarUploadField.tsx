
import { Box, TextField, Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import UserService from '../services/UserService';


export default function AvatarUploadField() {

    //When no profile pic is uploaded, show this default iamge. When uploaded, show the new image
    const [file, setFile] = useState("../no-profile-pic-icon-11.png");

    //Handler to change image file locally when new image is chosen
    function handleChange(e: any) {

        let url = URL.createObjectURL(e.target.files[0]);
        setFile(url);
        console.log(url);
        
    }

    //Handler to upload photo chosen to the backend
    const handleUpload = (e: any) => {

        let url = URL.createObjectURL(e.target.files[0]);
        setFile(url);
        let userId = this.user.id;

        UserService.uploadAvatar(userId, url);

    }

      //Handler to delete current photo saved in the backend
      const handleDeleteAvatar = (e: any) => {

        let userId = this.user.id;
        let fileName = this.filename;
        
        UserService.deleteAvatar(userId, fileName);

      }

    return(

        <Box sx={{ display: 'flex' }}>

                <Avatar
                    alt="Profile Image"
                    src={file}
                    sx={{ width: 75, height: 75 }}
                />
                <TextField
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
                <Button
                    variant="contained" 
                    component="span"
                    onClick={handleUpload}
                    >
                    Upload Avatar
                </Button>

                <Button
                variant="contained" 
                component="span"
                onClick={handleDeleteAvatar}
                >
                Delete Avatar
                </Button>

        </Box>
            
    )
}