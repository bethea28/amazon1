import * as React from 'react';
import { ButtonGroupProps, ArrowProps, DotProps } from 'react-multi-carousel/lib/types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Project, GetProjectsResponse } from '../../Resources/Constants'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import ProjectList from '../Dashboard/Components/ProjectList';

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
  export default function Caro(projects:Project[]){
    console.log("projects: ", projects)
    // if(projects[5].photoURLs)
    // {const proj = projects[5];
    //   console.log("proj: ", proj)
    // }
    
  // const CustomLeftArrow = ({ onClick }:CustomLeftArrowProps) => {
  //   return <button onClick={() => onClick()}></button>
  // }
  // const CustomRightArrow = ({ onClick }:CustomRightArrowProps) ...rest }) => {
  //   const {
  //     onMove,
  //     carouselState: { currentSlide, deviceType }
  //   } = rest;
  //   // onMove means if dragging or swiping in progress.
  //   return <button onClick={() => onClick()} />;
  // };
  const responsive = { 
    superLargeDesktop: {
    // the naming can be any, depends on you.
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

  const photo = 'https://amz1projectphotos.s3.amazonaws.com/f6ecfc49-01bb-4d8c-bfab-454b2c820521_pexels-photo-7418632.jpeg';

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
    { Object.keys(projects).map((project, idx) =>
    <Card key={idx} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={photo}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projects[idx].projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>)}
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
    {/* <WithStyles
      description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."
      headline="w3js.com - web front-end studio"
      image="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    /> */}
    
</Carousel>
</>
  )

}