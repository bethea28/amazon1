import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography, Box, Grid } from "@mui/material";
import { Project, User, initialUserData } from "../../Resources/Constants";
import UserService from "../../Services/UserService";
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";

export function GetName({ userId }: { userId: string }) {
  useEffect(() => {
    fetchUserData();
  }, []);

  const [userProfile, setUserProfile] = useState<User>(initialUserData);

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = (await UserService.getUser(userId)) as User;
        setUserProfile(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!userProfile) {
    return null;
  }

  const { firstName, lastName } = userProfile;

  return (
    <Typography sx={{ textDecoration: "underline" }}>
      {`${firstName} ${lastName}`}
    </Typography>
  );
}

interface Props {
  projects: Project[];
}

export default function CarouselSection({ projects }: Props) {
  return (
    <>
      {projects ? (
        <>
          <Carousel
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
              },
            }}
            centerMode={true}
          >
            {projects?.map((project, idx) => (
              <CarouselCard key={idx} project={project} />
            ))}
          </Carousel>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
