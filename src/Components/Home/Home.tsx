import { Grid, Typography } from "@mui/material";
import { Divider, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Project } from "../../Resources/constants";
import {
  getNewestProjects,
  getAllProjects,
  getRecommendedProjects,
} from "../../Services/ProjectService";
import CarouselSection from "./CarouselSection";
import { useParams } from "react-router-dom";
import Interest from "./Interest";

const Home = () => {
  const [recent, setRecent] = useState<Project[]>();
  const [stats, setStats] = useState<Project[]>();
  const [totalFundedAmount, setTotalFundedAmount] = useState<number>();
  const [categoryProjects, setCategoryProjects] = useState<Project[]>();
  const { category } = useParams();

  function separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  useEffect(() => {
    const fetchNewest = async () => {
      try {
        const response = await getNewestProjects();
        if (response) {
          setRecent(response!);
        }
      } catch (err) {
        setRecent(undefined);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await getRecommendedProjects(category!);
        if (response) {
          setCategoryProjects(response!);
        }
      } catch (err) {
        setCategoryProjects(undefined);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await getAllProjects();
        if (response) {
          setStats(response!);
        }
        let sum = 0;
        response!.forEach((item) => (sum += item.totalFundedNum));
        setTotalFundedAmount(sum);
      } catch (err) {
        setStats(undefined);
      }
    };

    fetchStats();

    if (!recent) {
      fetchNewest();
    }

    if (!categoryProjects) {
      fetchCategory();
    }
  }, [recent, categoryProjects, category]);

  if (!recent) {
    return null;
  }

  if (!categoryProjects) {
    return null;
  }

  return (
    <>
      <Box>
        <Interest />
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              display: "inline-block",
            }}
          >
            <Paper
              sx={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                mb: 4,
                mt: 2,
                height: 120,
                width: 900,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: "background.paper",
                color: "text.secondary",
                "& svg": {
                  m: 1.5,
                },
                "& hr": {
                  mx: 0.5,
                },
              }}
            >
              <Grid container justifyContent={"space-evenly"}>
                <Grid item>
                  <Typography variant="h4" color={"#335436"}>
                    {separator(stats!.length)}
                  </Typography>
                  <Typography>Projects funded</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item>
                  <Typography variant="h4" color={"#335436"}>
                    {separator(totalFundedAmount!)}
                  </Typography>
                  <Typography>towards creative work</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>

        {category == undefined ? (
          <Box sx={{ mb: 10 }}>{<CarouselSection projects={recent} />}</Box>
        ) : categoryProjects.length > 0 ? (
          <Box sx={{ mb: 10 }}>
            {<CarouselSection projects={categoryProjects} />}
          </Box>
        ) : (
          <>
            <Typography> {`No ${category} found`}</Typography>
            <Box sx={{ mb: 10 }}>{<CarouselSection projects={recent} />}</Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Home;
