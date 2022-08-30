import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  value: number;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; actualvalue: number }
) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.actualvalue
        )}% funded`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ value }: Props) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {value <= 100 ? (
        <LinearProgressWithLabel value={value} actualvalue={value} />
      ) : (
        <LinearProgressWithLabel value={100} actualvalue={value} />
      )}
    </Box>
  );
}
