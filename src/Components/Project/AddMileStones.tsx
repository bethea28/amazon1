import React,{useState, useEffect} from 'react';
import { Milestone } from '../../Resources/Constants'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
}))


export default function AddMileStones() {
    const classes = useStyles();

    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [sd, setSd] = useState(0);
   

    const addMilestones = () => {
        console.log("sdfg");
        let milestone1: Milestone = {
            name: "",
            amount: 0,
            targetDate: new Date()
        }

        //milestones.push(milestone1);
        setMilestones([...milestones, milestone1]);
        setSd(sd + 1);
    };
    console.log("p", milestones);
    
    return (
        <div>AddMileStones</div>
    )
}
