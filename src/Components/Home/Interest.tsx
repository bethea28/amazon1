import { Grid, Divider, Typography, Link, Box } from "@mui/material";
import { interests } from "../../Resources/constants";
import { useNavigate } from "react-router-dom";

export default function Interest() {
  const navigate = useNavigate();

  const selectCategory = (category: string) => {
    navigate(`/${category}`);
  };

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        justifyContent={"space-evenly"}
        marginTop={3}
        marginBottom={3}
      >
        {interests.map((interest, idx) => (
          <Grid item key={interest}>
            <Typography
              variant="subtitle1"
              fontSize={20}
              lineHeight={2}
              onClick={() => {
                selectCategory(interest);
              }}
            >
              <Link href={`/${interest}`} underline="hover">
                {interest}
              </Link>
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Box sx={{ my: 5 }}>
        <Typography variant="subtitle1" fontSize={40}>
          Bring a creative project to life.
        </Typography>
      </Box>
    </>
  );
}
