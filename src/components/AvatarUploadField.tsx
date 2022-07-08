
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import axios from 'axios';


export default function AvatarUploadField() {

    //When no profile pic is uploaded, show this default iamge. When uploaded, show the new image
    const [file, setFile] = useState("../no-profile-pic-icon-11.png");
    const [errorMessage, setErrorMessage] = useState('');

    //Handler to change image file when new image is chosen
    function handleChange(e: any) {
        let url = URL.createObjectURL(e.target.files[0]);
        setFile(url)
        console.log(url)

        // if (!url) {
        //     console.log('Missing Image URL');
        //     setErrorMessage('Missing a URL to upload to');
        //     return;
        // }
        
    }

    const handleSubmit = async(e: any) => {
        let url = URL.createObjectURL(e.target.files[0]);

        // try {
        //     const res = await Axios.post('/uploadAvatar', url);
        //     setFile(res.url);
        // } catch (error) {
        //     console.log(error);
        // }
      
        try {
          const response = await axios({
            method: "post",
            url: "/uploadAvatar",
            data: url,
          });
        } catch(error) {
          console.log(error)
        }

      }

    

    //function to delete old avatar after first upload from s3

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
                    onClick={handleSubmit}
                    >
                    Click me
                    </Button>
        </Box>
            
    )
}