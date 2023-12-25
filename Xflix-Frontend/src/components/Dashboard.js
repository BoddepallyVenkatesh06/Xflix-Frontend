import { Box } from "@mui/material";
/*For adding MUI GRID */
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <Box
      className="dashboard-container"
      sx={{ flexGrow: 1, backgroundColor: "#181818" }}
    >
      <Grid container spacing={2}>
        {props.videos.map((v) => (
          <Grid item xs={12} sm={6} md={3} key={v.id}>
            <VideoCard {...v} fetchVideoById={props.fetchVideoById} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
