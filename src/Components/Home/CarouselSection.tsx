import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Project, User, initialUserData } from '../../Resources/Constants'
import UserService from '../../Services/UserService';
import ViewProfile from '../UserProfile/ViewProfile';
import { useEffect, useState } from 'react';

export function GetName({ userId }: { userId: string }) {
  useEffect(() => {
    fetchUserData()
  }, [])

  const [userProfile, setUserProfile] = useState<User>(initialUserData);

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await UserService.getUser(userId) as User;
        setUserProfile(response);
      } catch (err) {
        console.log(err)
      }
    }
  }
  if (!userProfile) {
    return null
  }
  const { firstName, lastName } = userProfile

  return (
    <Typography sx={{ textDecoration: 'underline' }}>
      {firstName + " " + lastName}
    </Typography>
  )
}

export default function CarouselSection(projects: Project[]) {
  const navigate = useNavigate();

  const getPhotoUrl = (photoUrl: string[]) => {
    if (photoUrl && photoUrl.length > 0) {
      return photoUrl[0]
    }
    return 'https://picsum.photos/200/300';
  }
  const navigateTo = (page: string) => {
    const pageLink = `/projects/${page}`
    navigate(pageLink)
  }

  const styles = {
    Card: {
      width: 400,
      margin: 'auto'
    },
    media: {
    }
  }
  return (
    <>
      {projects
        ? <>
          <Carousel
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
              }
            }}
            centerMode={true}>
              
            {Object.keys(projects).map((project, idx) =>
              <Card key={project} sx={{ maxWidth: 440, height: 400, margin: 'auto' }}
                onClick={() => navigateTo(projects[idx].projectId)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={getPhotoUrl(projects[idx].photoURLs)}
                  alt="image"
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
                    sx={{ alignItems: 'left' }}>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">{<ViewProfile userId={projects[idx].userId} />}</Button>
                </CardActions>
              </Card>)}
          </Carousel>
        </>
        : <></>}
    </>
  )
}