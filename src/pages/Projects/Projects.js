
import { Paper,makeStyles } from '@material-ui/core'
import React from 'react'
import {ProjectForm} from './ProjectForm'
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles (theme =>({
  pageContent: {
      
    margin: theme.spacing(5),
    padding: theme.spacing(3)

}
}))


export default function Projects() {
  const classes = useStyles();

  return (
      <Paper className = {classes.pageContent}>
        <ProjectForm/>
      </Paper>
      
    
  )
}
