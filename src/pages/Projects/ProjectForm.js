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

   function handleSumbit(e){

        

       
            
            //     data:{
            //         projectName: values.projectName,
            //         targetFundingNum: values.targetFundingNum,
            //         targetFundingDate:values.targetFundingDate,
            //         description:values.description,
            //         categories: values.categories
            //     }
                
            let formData = new FormData();
    
            // Adding files to the formdata
            formData.append("projectName", values.projectName);
            formData.append("targetFundingNum", values.targetFundingNum);
            formData.append("targetFundingDate", values.targetFundingDate);
            formData.append("description", values.description);
            formData.append("categories", values.categories);
            
            axios({
          
              // Endpoint to send files
              url: "http://localhost:8080/project",
              method: "POST",
              headers: {
          
                // Add any auth token here
                //authorization: "your token comes here",
              },
          
              // Attaching the form data
              data: formData,
            })
            console.log(e)
              // Handle the response from backend here
              .then((res) => { })
              
              // Catch errors if any
              .catch((err) => { });
              
            
            //   .then((res) => { })
  
            //   // Catch errors if any
            //   .catch((err) => { });
            
  
    }

    // const handleInputChange = (e)=> {
    //     const {name, value} = e.target
    //     setValues({
    //         ...values,
    //         [name]:value
    //     })
    // }

    

    return (

        
            <Form>
            <Grid container>
            <Grid item xs = {6}>
                <Controls.Input
                name = "projectName"
                label = "Project Name"
                value = {values.projectName} 
                onChange = {handleInputChange}
                />
                <Controls.Input
                name = "targetFundingNum"
                label = "Target Funding Number"
                value = {values.targetFundingNum} 
                onChange = {handleInputChange}
                />
               
                <Controls.DatePicker
                name = "targetFundingDate"
                label = "Target Funding Date"
                value = {values.targetFundingDate} 
                onChange = {handleInputChange}
                />

                <Controls.Select
                name = "categories"
                label = "Categories"
                value = {values.categories}
                onChange = {handleInputChange}
                options = {ProjectService.getDepartmentCollection()}
                />
                 
            </Grid>
            <Grid item xs = {6}>
            <Typography>Input name of your project</Typography>
            <Typography>Input target funding amount</Typography>
            <Typography>Select target funding date </Typography>
            <Typography>Select categorie </Typography>
            </Grid>
           
            <Grid item xs = {12}>
            <Typography>Input descriptions of your project</Typography>
            <Controls.Input
                name = "description"
                label = "Description"
                multiline
                minRows={12}
                value = {values.description} 
                
                onChange = {handleInputChange}/>
                
                
            </Grid>
            </Grid>
           
            <Grid container>
            <Grid item xs = {12}>
            <div>
                    <Controls.Button
                        text = "Back"
                        startIcon={<ArrowBackIcon />}
                        />
                    <Controls.Button
                        text = "Sumbit"
                        type = "submit"
                        endIcon = {<SendIcon />}
                        onClick = {(e) => handleSumbit(e)}/>
                        
            </div>
            </Grid>
            </Grid>
            

            
            </Form>

       


    )
}
