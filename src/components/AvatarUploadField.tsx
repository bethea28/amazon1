
import { Box, TextField, Avatar, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import AvatarService from '../services/AvatarService';
import axios from 'axios';

export default function AvatarUploadField() {

    //Need to be updated later with current user
    const userId = "001";

    const filename = userId;

    //Shows either the default image for no image saved or the current image saved
    const[preview, setPreview] = useState("");

    //Sets the image file to be saved
    const [file, setFile] = useState("");

    //This useState disables the Save Avatar button after it is clicked 
    const [disabledSave, setDisabledSave] = useState(false);

    //This useState disables the Save Avatar button after it is clicked 
    const [disabledDelete, setDisabledDelete] = useState(false);

    const showAvatar = async () => {

    try {

        //Axios get service is set up and will move this logic there
        const { data } = await axios(`http://localhost:8080/api/getAvatar/${userId}/${filename}`, {
            method: 'GET',
        });    
        console.log(data);
        let convert: any = Object.entries(data);
        console.log(convert[0][1]);
        let uri = convert[0][1].uri;
        console.log(uri);
        
        setPreview(uri);

     } catch (error) {
            console.log(error);
        }

    };

    //onLoad display the image of the avatar associated with current user
    useEffect( () => {
    
    showAvatar();
 
    }, []);

    //Handler to change the image displayed and file to be saved based on the image chosen to be saved.
    function handleChange(e: any) {
        let fileChosen = URL.createObjectURL(e.target.files[0]);
        setPreview(fileChosen);
        setFile(e.target.files[0]);
    }

    //Handler to upload photo chosen to the backend
    const handleUpload = (e: any) => {
        setDisabledSave(true);
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        AvatarService.uploadAvatar(userId, bodyFormData);
    }

    //Handler to delete current photo saved in the backend
    const handleDeleteAvatar = (e: any) => {
        setDisabledDelete(true);
        AvatarService.deleteAvatar(userId, userId);
        let noAvatar = "";
        setPreview(noAvatar);
        setFile(noAvatar);
    }

    return(

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
                  sx={{ margin: 1, backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25 }}
                  variant="contained" 
                  component="span"
                  disabled={disabledSave}
                  onClick={handleUpload}
                  >
                  Save Avatar
                  </Button>

              <Button className="deleteAvatar"
                  sx={{ margin: 1, backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25 }}
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