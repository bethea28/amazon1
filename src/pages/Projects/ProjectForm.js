import { Grid, makeStyles, TextField, createTheme } from '@material-ui/core';
import React,{useState, useEffect} from 'react'
import {Controls} from '../../components/controls/Controls';
import {useForm,Form} from '../../components/useForm';
import * as ProjectService from '../../services/ProjectService';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axiosInstance from '../../../src/apiConfig';
import axios from "axios";


const initialValues = {
    userId:'',
    projectName:'',
    targetFundingNum:'',
    targetFundingDate:new Date(),
    description:'',
    categories:'',
}


export function ProjectForm() {

    const validate = (fieldValues = values) =>{
        let temp = {...errors}
        if('projectName' in fieldValues)
            temp.projectName = fieldValues.projectName?"":"This field is required."
        if('targetFundingNum' in fieldValues)
            temp.targetFundingNum = fieldValues.targetFundingNum > 0 ? "":"This field is required."
        if('description' in fieldValues)
            temp.description = fieldValues.description?"":"This field is required."
        if('categories' in fieldValues)
            temp.categories = fieldValues.categories.length != 0 ? "":"This field is required."
        setErrors({
            ...temp
        })
        if(fieldValues == values)
            return Object.values(temp).every(x => x == "")
        
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
        

    } = useForm(initialValues, true, validate);
   
  
        const handleSubmit = e => {
            let state = {
                userId: '002',
                projectName: values.projectName,
                targetFundingNum:values.targetFundingNum.toString(),
                targetFundingDate:values.targetFundingDate.toString(),
                description:values.description,
                categories: values.categories.toString()
            }
            
            if(validate()){
                fetch('project', {
                    method:  'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(state),
                });
                window.confirm("You create a new project successfully!");  
                resetForm()  

            }
 
             
        }

        // let formData = new FormData();
    
        // // Adding files to the formdata
        // formData.append("userId:", "002");
        // formData.append("projectName", values.projectName);
        // formData.append("targetFundingNum",values.targetFundingNum.toString());
        // formData.append("targetFundingDate",values.targetFundingDate.toString());
        // formData.append("description",values.description);
        // formData.append("categories", values.categories.toString());

        //   axios({
  
        //     // Endpoint to send files
        //     url: 'http://localhost:8080/project',
        //     method: 'POST',
            
        //     headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //     // Attaching the form data
        //     data: formData,
        //   })
        // const url = 'http://localhost:8080/project'
        // axios.post(url, formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     transformRequest: formData => formData,
        //   })
        
        
       
        
        //  const postData = async () => {

        //     let req = await axios.post("http://localhost:8080/project", {
        //         userId: '002',
        //         projectName: values.projectName,
        //         targetFundingNum:values.targetFundingNum.toString(),
        //         targetFundingDate:values.targetFundingDate.toString(),
        //         description:values.description,
        //         categories: values.categories.toString()
        //     });
        //     console.log("post data", req);
        //   };
        

    return (

            <Form >
            <Grid container>
            <Grid item xs = {6}>
                <Controls.Input
                name = "projectName"
                label = "Input name of your project"
                value = {values.projectName} 
                onChange = {handleInputChange}
                error = {errors.projectName}
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
                error = {errors.targetFundingNum}
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
                error = {errors.categories}
                />
            </Grid> 
            <Grid item xs = {6} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography align = 'center'>Categories</Typography>
            </Grid>   
            <Grid item xs = {4} style={{ display: "center", justifyContent: "flex-start", alignItems: "center"  }}>
                <Typography>Descriptions</Typography>
            </Grid>
            <Grid item xs = {12} style={{ display: "center", justifyContent: "flex-start", alignItems: "center"  }}>
                <Controls.Input
                name = "description"
                label = "Input descriptions of your project"
                multiline
                minRows={12}
                value = {values.description} 
                onChange = {handleInputChange}
                error = {errors.description}
                />    
                </Grid>    
            </Grid>
           
            <Grid container>
            <Grid item xs = {4}>
                <Controls.Button
                text = "Back"
                startIcon={<ArrowBackIcon />}
                />
            </Grid>
            <Grid item xs = {4}>
                <Controls.Button
                text = "Reset"
                startIcon={<RestartAltIcon />}
                onClick = {resetForm}
                />
            </Grid>
            <Grid item xs = {4}>
                <Controls.Button
                text = "Sumbit"
                onClick = {handleSubmit}
                endIcon = {<SendIcon />}
                />
                </Grid>
            </Grid>

            </Form>


    )
}
