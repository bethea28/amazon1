
import { Box, TextField, Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import AvatarService from '../services/AvatarService';


export default function AvatarUploadField() {

    //Need to be updated later with global userId prop to match current user logged in
    const userId = "001";
    
    //When no profile pic is uploaded, show this default iamge. When uploaded, show the new image
    const [file, setFile] = useState("");

    const[preview, setPreview] = useState("");

    function handleChange(e: any) {
        let fileChosen = URL.createObjectURL(e.target.files[0]);
        setPreview(fileChosen);
        setFile(e.target.files[0]);
        console.log(fileChosen);
        console.log(e.target.files[0]);
    }
    
    //Handler to change image file to be saved in the BE when new image is chosen
    // function handleFileChange(e: any) {
    //     // let fileChosen = URL.createObjectURL(e.target.files[0]);
    //     let fileChosen = e.target.files[0];
    //     setFile(fileChosen);
    //     console.log(fileChosen);
    // }

    // //Handler to change image preview
    // function handlePreviewChange(e: any) {
    //     // let fileChosen = URL.createObjectURL(e.target.files[0]);
    //     let fileChosen = e.target.files[0];
    //     setFile(fileChosen);
    //     console.log(fileChosen);
    // }

    // //Handler to upload photo chosen to the backend
    // const handleUpload = (e: any) => {
    //     // let newFile = Buffer.from(file).toString('base64');
    //     let bodyFormData = new FormData();
    //     bodyFormData.append('file', file);
    //     let finalFormData = new FormData();
    //     finalFormData.append('file', bodyFormData, file);
    //     AvatarService.uploadAvatar(userId, finalFormData);
    // }

        //Handler to upload photo chosen to the backend
        const handleUpload = (e: any) => {
            // let newFile = Buffer.from(file).toString('base64');
            let bodyFormData = new FormData();
            bodyFormData.append('file', file);
            AvatarService.uploadAvatar(userId, bodyFormData);
            
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