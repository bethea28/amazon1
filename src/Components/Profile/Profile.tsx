import React from 'react'
 import { Box } from '@mui/material';
 import { Grid, Paper, Button, TextField} from '@mui/material';
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
 import Avatar from '@mui/material/Avatar';
 import AppbarPrivate from '../Navbar/AppbarPrivate';
 import AppbarPublic from '../Navbar/AppbarPublic';

 interface DataProps {
   ProfileData?: []
 }

 interface DataState {
   user_id: string;
   name: string;
   email:string;
   bio: string;
   personalInfoSection: boolean;
   bioScetion: boolean;
   interestSection: boolean;
 }

 export default class Profileinfo extends React.Component<DataProps, DataState> {  

  userLoggedIn = true;

   constructor(props:any) {
     super(props)
     this.state = {
       user_id: "001",
       name: "",
       email:"",
       bio: "",
       personalInfoSection: false,
       bioScetion: false,
       interestSection: false
     };
   }

   componentDidMount(){
     fetch('http://localhost:8081/profile/001')
     .then(res => res.json())
     .then((output)=>{
       let myMap = new Map<string, string>(Object.entries(output));
       this.setState({name: myMap.get('name')!, email: myMap.get('email')!, bio: myMap.get('bio')!})
     });
   }

   handleClick = (id:string, event: React.MouseEvent<HTMLElement>) => {
     console.log(this.state.personalInfoSection)
     if(id == "1")
     {
       console.log("1")
       if(this.state.personalInfoSection) 
         this.setState({personalInfoSection:false})
       if(!(this.state.personalInfoSection))
         this.setState({personalInfoSection:true})
     }
     //value: React.Dispatch<React.SetStateAction<string>>
   };

   paperStyleParent: React.CSSProperties = {
     flexDirection: 'column',
     height: '28%',
     marginTop: 10,
     marginRight: 25,
     borderRadius: '5px',
     display: 'flex', 
     backgroundColor: '#EAEAEA',
   }
   boxStyleParent: React.CSSProperties = {
     width: '100%',
     borderRadius: '5px',
     display: 'flex', 
     backgroundColor: '#335436',

   }

   handleSubmit=(event: React.MouseEvent<HTMLElement>)=>{
     event.preventDefault()
     const user_id = "001"
     const name = this.state.name
     const email = this.state.email
     const bio = this.state.bio
     const userInfo={user_id, name, email, bio}
     fetch('http://localhost:8081/profile/001',{
       method:"PUT",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify(userInfo)
   }).then(()=>{
   })
   // window.location.reload();
 }

   render() {
     return (
      
       <Box sx={{ display: 'flex', flexDirection: 'column', height: 1000}}>
         {this.userLoggedIn ? <AppbarPrivate /> : <AppbarPublic />}
         <Box
           sx={{
             width: 1,
             height: 1 / 4,
             my: 3,
             mr: 2,
             backgroundColor: '#EAEAEA',
             borderRadius: '5px',
             fontSize: '0.875rem',
             fontWeight: '700',
             textAlign: 'center',
             label: "profile-header-picture"
           }}>
           Picture
         </Box>
         <Box
           sx={{
             width: 2 / 3,
             height: 3 / 4,
             mx: "auto",
             pl: 3,
             py: 1,
             backgroundColor: '#EAEAEA',
             borderRadius: 2,
             fontSize: '0.875rem',
             fontWeight: '700',
             textAlign: 'left',
             label: "My profile section"
           }}>
             <Box sx={{ fontWeight: 'bold'}}>My Profile</Box>
               <Paper elevation={3} style={this.paperStyleParent}>    
                 <Box style={this.boxStyleParent} sx={{height: 1 / 4}}>
                   <Grid item container direction="row" justifyContent="space-between">
                     <Grid item>
                     <Box sx={{ml: 1, mt: 1, color: '#FFFFFF', typography: 'subtitle2' }}>Personal Information</Box>
                     </Grid>
                     <Grid item>
                       <Box sx={{ml: 2, mr: 1}}>
                         <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25}} variant="contained" onClick={this.handleClick.bind(this,"1")} endIcon={<KeyboardArrowUpIcon />}></Button>
                       </Box>
                     </Grid>
                   </Grid>
                 </Box>
                 <Box sx={{ml:2, m: 1, height: 3 / 4}}>
                   <Grid container direction={"column"} component="form" spacing={1}>
                     <Grid item>
                       <TextField fullWidth
                       id="outlined-basic" 
                       label="Name"
                       InputLabelProps={{shrink: true}}
                       value={this.state.name}
                       onChange={event => {
                         const { value } = event.target;
                         this.setState({ name: value });
                         //console.log(this.state.name);
                       }}

                         size="small"/>
                     </Grid>
                     <Grid item>
                         <TextField fullWidth id="outlined-basic" label="email" 
                         InputLabelProps={{shrink: true}} value={this.state.email} 
                         variant="outlined" size="small" onChange={event => {
                           const { value } = event.target;
                           this.setState({ email: value });
                         }}/>
                     </Grid>
                     <Grid item>
                     <Avatar />
                     </Grid>
                   </Grid>
                 </Box>

               </Paper>

               <Paper elevation={3} style={this.paperStyleParent}>    
                 <Box style={this.boxStyleParent} sx={{height: 1 / 4}}>   

                 <Grid item container direction="row" justifyContent="space-between">
                 <Grid item>
                 <Box sx={{ml: 1, mt:1, color: '#FFFFFF', typography: 'subtitle2' }}>Bio</Box>
                 </Grid>
                 <Grid item>
                   <Box sx={{ml: 2, mr: 1}}>
                     <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25,  }}  variant="contained" onClick={this.handleClick.bind(this, "2")} endIcon={<KeyboardArrowUpIcon />}></Button>
                   </Box>
                 </Grid>
               </Grid> 


                 </Box>
                   <Box sx={{m:1, height: 3 / 4}}>
                     <Grid container direction={"column"} component="form" spacing={1}>
                       <Grid item>
                         <TextField fullWidth
                           id="outlined-multiline"
                           size="medium"
                           label="Bio"
                           value={this.state.bio}
                           onChange={event => {
                               const { value } = event.target;
                               this.setState({ bio: value });
                             }}
                           multiline
                           rows={4}
                           InputLabelProps={{shrink: true}}
                         />
                       </Grid>     
                     </Grid>


                   </Box>
               </Paper>

               <Paper elevation={3} style={this.paperStyleParent}>    
                 <Box style={this.boxStyleParent} sx={{height: 1 / 4}}>   

                 <Grid item container direction="row" justifyContent="space-between">
                 <Grid item>
                 <Box sx={{ml: 1, mt: 1, color: '#FFFFFF', typography: 'subtitle2' }}>Interest</Box>
                 </Grid>
                 <Grid item>
                   <Box sx={{ml: 2, mr: 1}}>
                     <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", mt:1, height: 25}} variant="contained" onClick={this.handleClick.bind(this, "3")} endIcon={<KeyboardArrowUpIcon />}></Button>
                   </Box>
                 </Grid>
               </Grid> 


                 </Box>
                   <Box sx={{m:1, height: 3 / 4}}>
                     <Grid container direction={"column"} component="form" spacing={1}>
                       <Grid item>

                       </Grid>     
                     </Grid>


                   </Box>
               </Paper>
                   <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-end">
                   <Grid item>
                     <Box sx={{my: 2, mr:3}}> <Button sx={{backgroundColor:"#A6BBA7", color:"#000000", borderRadius:50}} variant="contained" onClick={this.handleSubmit}>Save Profile</Button></Box></Grid>
                   </Grid>

             </Box>
       </Box>
     );
   }
 }