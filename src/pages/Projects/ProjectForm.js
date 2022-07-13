import { Grid, makeStyles, TextField, createTheme } from '@material-ui/core';
import React,{useState, useEffect} from 'react'
import {Controls} from '../../components/controls/Controls';
import {useForm,Form} from '../../components/useForm';
import * as ProjectService from '../../services/ProjectService';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import axiosInstance from '../../../src/apiConfig';
import axios from "axios";

 
// const useStyles = makeStyles (theme =>({
//     root: {
//         '& .MuiFormControl-root': {
//             width:'80%',
//             margin: theme.spacing(1)
//         }
//     }
// }))


const initialValues = {
    userId:0,
    projectName:'',
    targetFundingNum:'',
    targetFundingDate:new Date(),
    categories:'',
    description:'',
    

}

export function ProjectForm() {

    //const[values, setValues] = useState(initialValues);
    //const classes = useStyles();

    const{
        values,
        setValues,
        handleInputChange,
        

    } = useForm(initialValues);

    const handleSubmit = e => {
        
        console.log(values)
        window.alert("testing")
        
        //e.preventDefalut()
        try {
                return axiosInstance.post('/project', {
                    values
                })
            } catch(e) {
                console.log(values)
            }
       
        
        //let formData = new FormData();

        //// Adding files to the formdata
        // formData.append("projectName", values.projectName);
        // formData.append("targetFundingNum", values.targetFundingNum);
        // formData.append("targetFundingDate", values.targetFundingDate);
        // formData.append("description", values.description);
        // formData.append("categories", values.categories);
        // console.log(formData)
        // try {
        //     return axiosInstance.post('/profile', {
        //         formData
        //     })
        // } catch(e) {
        //     console.log(values)
        // }
    }

//    function handleSumbit(e){

//             let formData = new FormData();
    
//             // Adding files to the formdata
//             formData.append("projectName", values.projectName);
//             formData.append("targetFundingNum", values.targetFundingNum);
//             formData.append("targetFundingDate", values.targetFundingDate);
//             formData.append("description", values.description);
//             formData.append("categories", values.categories);
            
//             axios({
          
//               // Endpoint to send files
//               url: "http://localhost:8080/project",
//               method: "POST",
//               headers: {
          
//                 // Add any auth token here
//                 //authorization: "your token comes here",
//               },
          
//               // Attaching the form data
//               data: formData,
//             })
//             console.log(e)
//               // Handle the response from backend here
//               .then((res) => { })
              
//               // Catch errors if any
//               .catch((err) => { });
            
            
  
//     }

    // const handleInputChange = (e)=> {
    //     const {name, value} = e.target
    //     setValues({
    //         ...values,
    //         [name]:value
    //     })
    // }

    

    return (

        
            <Form onSubmit={handleSubmit}>
            <Grid container>
            <Grid item xs = {6}>
                <Controls.Input
                name = "projectName"
                label = "Input name of your project"
                value = {values.projectName} 
                onChange = {handleInputChange}
                />
            </Grid>
            <Grid item xs = {2} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            <Typography>Project Name</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Controls.Input
                name = "targetFundingNum"
                label = "Input target funding amount "
                value = {values.targetFundingNum} 
                onChange = {handleInputChange}
                />
            </Grid>
            <Grid item xs = {6} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            <Typography>Target Funding Number</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Controls.DatePicker
                name = "targetFundingDate"
                label = "Select target funding date"
                value = {values.targetFundingDate} 
                onChange = {handleInputChange}
                />
            </Grid>
            <Grid item xs = {6} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            <Typography>Target Funding Date</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Controls.Select
                name = "categories"
                label = "Select categories"
                value = {values.categories}
                onChange = {handleInputChange}
                options = {ProjectService.getDepartmentCollection()}
                />
            </Grid> 
            <Grid item xs = {6} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            
            <Typography align = 'center'>Categories</Typography>
            </Grid>   
           
            <Grid item xs = {6} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            <Typography>Descriptions</Typography>
            </Grid>
            <Grid item xs = {12} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
            <Controls.Input
                name = "description"
                label = "Input descriptions of your project"
                multiline
                minRows={12}
                value = {values.description} 
                
                onChange = {handleInputChange}/>
                
            </Grid>    
            
            </Grid>
           
            <Grid container>
            <Grid item xs = {6}>
            
                <Controls.Button
                    text = "Back"
                    startIcon={<ArrowBackIcon />}
                    />

            </Grid>
            <Grid item xs = {6}>
            <Controls.Button
                text = "Sumbit"
                type = "submit"
                endIcon = {<SendIcon />}
                />
            </Grid>
            </Grid>

            </Form>


    )
}
