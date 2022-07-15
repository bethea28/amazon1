
import { Box, TextField, Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import AvatarService from '../services/AvatarService';


export default function AvatarUploadField() {

    //Need UseContext to pass in global userId variable
    const userId = "001";

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

        AvatarService.uploadAvatar(userId, file);

    }

      //Handler to delete current photo saved in the backend
      const handleDeleteAvatar = (e: any) => {
        
        AvatarService.deleteAvatar(userId, file);

      }

    return(

      <Box sx={{ display: 'flex', flexDirection: 'column', border: 4 }}>
            <Box sx={{ display: 'flex', margin: 2, justifyContent: 'center' }}>
                <Avatar
                    alt="Profile Image"
                    src={file}
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
              <Button
                  sx={{ margin: 1, backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25 }}
                  variant="contained" 
                  component="span"
                  onClick={handleUpload}
                  >
                  Save Avatar
                  </Button>

              <Button
                  sx={{ margin: 1, backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25 }}
                  variant="contained" 
                  component="span"
                  onClick={handleDeleteAvatar}
                  >
                  Delete Avatar
                  </Button>
            </Box>
      </Box>
            
    )
}