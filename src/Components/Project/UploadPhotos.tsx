import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { uploadPhoto } from "../../Services/ProjectService";



export default function UploadPhotos() {

    const { id } = useParams(); //projectId to save photos to
    const filename = "example_filename" //filename on a specific card

    const[preview, setPreview] = useState("");
    const [file, setFile] = useState("");
    const [disabledSave, setDisabledSave] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);

    function handleChange(e: any) {
        let fileChosen = URL.createObjectURL(e.target.files[0]);
        setPreview(fileChosen);
        setFile(e.target.files[0]);
    }

    const handleUpload = (e: React.MouseEvent<HTMLElement>) => {
        setDisabledSave(true);
        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        uploadPhoto(id!, bodyFormData);
    }

    return(
        <Box>
            
        </Box>
    )    
    
}