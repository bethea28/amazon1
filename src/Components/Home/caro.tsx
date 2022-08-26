import React, { useState, useEffect } from "react"
import { ButtonGroupProps, ArrowProps, DotProps } from 'react-multi-carousel/lib/types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Project, GetProjectsResponse, User } from '../../Resources/Constants'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import ProjectList from '../Dashboard/Components/ProjectList';
import { useNavigate } from 'react-router-dom';
import ViewProfile from '../UserProfile/ViewProfile';
import UserService from '../../Services/UserService';

interface CustomLeftArrowProps extends ArrowProps {
  myOwnStuff: string;
}
interface CustomRightArrowProps extends ArrowProps {
  myOwnStuff: string;
}

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string;
}
// export default function Caro(projects:GetProjectsResponse){
  export default function Caro(projects:Project[], isPrivate:boolean){
  
    const navigate = useNavigate();
    const styles = {
      Card: {
        width: 300,
        margin: 'auto'
      },
      media: {
        // height: '50%',
        // width: '100%'
        // height: 200,
        // width: 200,
        // paddingTop: '56.25%', // 16:9,
        // marginTop:'30'
      }
  };

  const NavigateTo = (page:string) => {
    // const pageLink = "/projects/"+page
    // navigate(pageLink)
    navigate('')
  }
  const responsive = { 
    superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  const CarouselButtonGroup = ({ next, previous }:CarouselButtonGroupProps) => {
    return (
      <div>
        {/* <button onClick={() => previous()} />
        <button onClick={() => next()} /> */}
      </div>
    );
  };
  const CustomDots = ({ index, active, onClick, carouselState }:DotProps) => {
    return <div onClick={() => onClick }>This is a Custom dots</div>
  }

  const getPhotoUrl = (photoUrl:string[]) => {
    if(photoUrl){
      return photoUrl[0]
    }
    return 'https://picsum.photos/200/300';
  }

  const fetchUserData = async (userId:string) => {
    if(projects){
    try{
      const response = await UserService.getUser(userId) as User;

      const name = response.firstName + " " + response.lastName;
      return name;
    }catch (err)
    {
      console.log(err)
    }}
  }
  if(!projects)
  {
    return null
  }
  
  return(
    <>
    <Carousel
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode={false}
    className=""
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
      }
    }}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable
  >
    {
    Object.keys(projects).map((project, idx) =>
    <Card key={project} sx={{ maxWidth: 345, width: 400, height: 450, margin:'auto' }}
    // onClick=() => {NavigateTo('whereTo')}
    onClick={() => NavigateTo(projects[idx].projectId)}
    >
      <CardMedia
        component="img"
        height="200"
        //image={getPhotoUrl(projects[5].photoURLs[0])}
        image={getPhotoUrl(projects[idx].photoURLs)}
        // onError={imageOnErrorHandler}
        //image={photo}
        alt="green iguana"
        style={styles.media}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projects[idx].projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {projects[idx].description}
        {projects[idx].userId}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
        <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{textDecoration:'underline' }}>
          {/* {() => {
            const response = UserService.getUser(projects[idx].userId)
            const {firstName, lastName} = response as Partial<User>;
            return firstName! + lastName!;
              }} */}
               By: 
      </Typography>  
      <Box>
        {/* {fetchUserData('k')} */}
      </Box>
      {/* {fetchUserData(projects[idx].userId)} */}
        {/* <ViewProfile userId={projects[idx].userId}/> */}
      </CardActions>
    </Card>)}
    
</Carousel>
<Box sx = {{my:4}}>
  {}
</Box>
</>
  )

}