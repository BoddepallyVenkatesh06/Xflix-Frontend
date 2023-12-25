import { Box, Button } from "@mui/material";
import SwapVertSharpIcon from "@mui/icons-material/SwapVertSharp";
import "./GenrePanel.css";

function GenrePanel(props) {
  const boxSx = {
    color: "#586069",
    background: "#FFFFFF",
    borderRadius: 25,
    padding: 1,
    "&:hover": {
      color: "#586069",
      background: "#FFFFFF",
    },
  };
  const boxSx2 = { color: "#FFFFFF", borderRadius: 25 };

  return (
    <Box className="genrepanel">
      <Box className="genres">
        {props.stateCat.genres.map((c, i) => (
          <Button
            className="btncategory"
            value={c.id}
            variant="text"
            sx={c.status ? boxSx : boxSx2}
            key={c.id}
            onClick={(e) => {
              props.selectCategory(e);
            }}
          >
            {c.genre}
          </Button>
        ))}
        {props.sortedValue === "releaseDate" ? (
          <Button
            variant="text"
            value="releaseDate"
            sx={boxSx}
            onClick={(e) => {
              props.ToggleValues(e);
            }}
          >
            <SwapVertSharpIcon sx={{ fontSize: 25 }} />
            Release Date
          </Button>
        ) : (
          <Button
            variant="text"
            value="viewCount"
            sx={boxSx}
            onClick={(e) => {
              props.ToggleValues(e);
            }}
          >
            <SwapVertSharpIcon sx={{ fontSize: 25 }} />
            View Count
          </Button>
        )}
      </Box>
      <Box className="genres">
        {props.ages.map((c, i) => (
          <Button
            className="btncategory"
            value={c}
            variant="text"
            sx={props.selected === c ? boxSx : boxSx2}
            key={i}
            onClick={(e) => {
              props.selectAgeGroup(e);
            }}
          >
            {c}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default GenrePanel;
