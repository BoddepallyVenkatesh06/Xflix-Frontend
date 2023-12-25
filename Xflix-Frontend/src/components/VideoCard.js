import {
  CardMedia,
  CardContent,
  Card,
  Typography,
  CardActionArea,
} from "@mui/material";
import "./VideoCard.css";
import { Link } from "react-router-dom";
const VideoCard = (props) => {
  const calculateYears = (date) => {
    let years = new Date(new Date() - new Date(date)).getFullYear() - 1970;
    let months;
    if (years === 0) {
      let dateTo = new Date();
      let dateFrom = new Date(date);
      months =
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear());
    }

    if (years > 1) {
      return years + " years ago";
    } else if (years === 1) {
      return years + " year ago";
    } else if (months > 1) {
      return months + " months ago";
    } else if (months === 1) {
      return months + " month ago";
    } else {
      return "This month";
    }
  };

  return (
    <Card sx={{ background: "#181818", color: "#ffffff" }}>
      <Link
        className="link"
        to={`/VideoPage/${props.id}`}
        onClick={() => {
          if (props.fetchVideoById) {
            props.fetchVideoById(props.id);
          }
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={props.previewImage}
            alt={props.title}
          />
          <CardContent p={0} className="videocard-content">
            <Typography gutterBottom variant="subtitle1" component="div">
              {props.title}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {calculateYears(props.releaseDate) === "This month"
                ? props.releaseDate
                : calculateYears(props.releaseDate)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default VideoCard;
