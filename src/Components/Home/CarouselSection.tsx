import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ButtonGroupProps, ArrowProps, DotProps } from 'react-multi-carousel/lib/types';
import { Button, Card, CardActions, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Project, User, initialUserData } from '../../Resources/Constants'
import UserService from '../../Services/UserService';
import ViewProfile from '../UserProfile/ViewProfile';
import { useEffect, useState } from 'react';

export function GetName({ userId }: { userId: string }){
  useEffect(() => {
    fetchUserData()
  }, [])

  const [userProfile, setUserProfile] = useState<User>(initialUserData);
  const fetchUserData = async () => {
    if(userId){
    try{
      const response = await UserService.getUser(userId) as User;
      setUserProfile(response);
    }catch (err)
    {
      console.log(err)
    }}
  }
  if(!userProfile)
  {
    return null
  }
  const { firstName, lastName } = userProfile

  return(
    <>
    <Typography sx={{textDecoration:'underline'}}>
    {firstName + " " + lastName}
    </Typography>
    </>
  )
}

export default function CarouselSection(projects:Project[])
{
  const navigate = useNavigate();

  interface CarouselButtonGroupProps extends ButtonGroupProps {
    className?: string;
  }

  const Page = () => {
    navigate('/projects/7d744aec-982d-4712-8a45-a6d6f8bc1fa2')
  }
  const getPhotoUrl = (photoUrl:string[]) => {
    if(photoUrl){
      return photoUrl[0]
    }
    return 'https://picsum.photos/200/300';
  }
  const navigateTo = (page:string) => {
    // const pageLink = "/projects/"+page
    // navigate(pageLink)
    navigate('projects/7d744aec-982d-4712-8a45-a6d6f8bc1fa2')
  }

  const styles = {
    Card: {
      width: 400,
      margin: 'auto'
    },
    media: {
    }
  }
  return(
    <>
    {projects
    ? <>
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
        items: 1,
        partialVisibilityGutter: 30
      }}
    }
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable>
    { Object.keys(projects).map((project, idx) =>
      <Card key={idx} sx={{ maxWidth: 440, height: 400, margin:'auto' }} 
      onClick={() => navigateTo(projects[idx].projectId)}>
        <CardMedia
          component="img"
          height="200"
          image={getPhotoUrl(projects[idx].photoURLs)}
          alt="green iguana"
          style={styles.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontFamily={'sans-serif'}>
          {projects[idx].projectName}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontFamily={'sans-serif'}>
          {projects[idx].description}
          </Typography>
          <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{ alignItems:'left' }}>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{<ViewProfile userId={projects[idx].userId}/>}</Button> 
        </CardActions>
      </Card>)}
    </Carousel>
    </>
    : <>
    No projects
    </>}
    
    <Box sx = {{my:4}}>
          {/* footer */}
  </Box>
  </>
  )
}