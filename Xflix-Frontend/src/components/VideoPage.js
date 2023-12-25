import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { config } from "../App";
import { Box, Button } from "@mui/material";
import Header from "./Header";
import { useParams } from "react-router-dom";
import "./VideoPage.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAlt";
import CircularProgress from "@mui/material/CircularProgress";

function VideoPage(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const params = useParams();
  const [video, setVideo] = useState({});
  const [votes, setVotes] = useState(0);
  const [isLoading, setLoadingValue] = useState(true);

  const fetchVideoById = async (videoId) => {
    let url = config.endpoint + "/v1/videos/" + videoId;

    const res = await axios.get(url);
    let data = await res.data;
    setVideo(data);
    if (data) {
      setLoadingValue(false);
    }
  };

  const updateVote = (action) => {
    try {
      let url = "";
      let res;
      if (action === "upVote") {
        url = config.endpoint + "/v1/videos/" + params.id + "/votes";

        res = axios.patch(url, { vote: "upVote", change: "increase" });

        setVotes({ ...votes, upVotes: votes.upVotes + 1 });
      }

      if (action === "downVote") {
        url = config.endpoint + "/v1/videos/" + params.id + "/votes";
        res = axios.patch(url, { vote: "downVote", change: "increase" });
        setVotes({ ...votes, downVotes: votes.downVotes + 1 });
      }
    } catch (err) {
      enqueueSnackbar("" + err.response.data.message, { variant: "error" });
    }
  };

  const fetchVideos = async (url) => {
    try {
      let res = await axios.get(url);
      let data = await res.data;
      //console.log(data);
      setVideos(data.videos);
    } catch (err) {
      enqueueSnackbar("" + err.response.data.message, { variant: "error" });
    }
  };

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

  useEffect(() => {
    async function showData() {
      let url;
      url = config.endpoint + "/v1/videos";
      fetchVideos(url);
      fetchVideoById(params.id);
    }
    showData();
  }, []);

  const updateVotes = async (videoId) => {
    let url = config.endpoint + "/v1/videos/" + videoId;

    const res = await axios.get(url);

    let votes1 = await res.data.votes;
    setVotes(votes1);
  };

  useEffect(() => {
    updateVotes(params.id);
  }, [video]);

  return (
    <Box>
      <Header
        searchVisible={false}
        uploadVisible={false}
        fetchVideos={fetchVideos}
      />

      {/* Below code works fine */}
      {isLoading ? (
        <Box className="circular-progress">
          <CircularProgress />
          <Box>Loading Video</Box>
        </Box>
      ) : (
        <Box className="main-video-box">
          <Box className={"iframe-container"}>
            <iframe
              title={"YouTubeVideo"}
              className="iframe"
              src={"https://" + video.videoLink + "?autoplay=1&loop=1"}
              allowFullScreen="allowFullscreen"
            />
          </Box>
          <Box className="container-text-and-buttons">
            <Box className="text">
              <h2 className="title">{video.title}</h2>
              <span className="subtitle">
                {video.contentRating} &nbsp; &#x2022; &nbsp;
                {calculateYears(video.releaseDate) === "This month"
                  ? video.releaseDate
                  : calculateYears(video.releaseDate)}
              </span>
            </Box>
            <Box className="buttons-div">
              <Button
                variant="contained"
                startIcon={<ThumbUpIcon />}
                sx={
                  votes.upVotes > 0
                    ? { borderRadius: 4, width: "100%" }
                    : {
                        backgroundColor: "initial",
                        borderRadius: 4,
                        width: "100%",
                      }
                }
                onClick={() => {
                  updateVote("upVote");
                }}
              >
                {votes.upVotes}
              </Button>
              <Button
                variant="contained"
                startIcon={<ThumbDownIcon />}
                sx={
                  votes.downVotes > 0
                    ? { borderRadius: 4, width: "100%" }
                    : {
                        backgroundColor: "initial",
                        borderRadius: 4,
                        width: "100%",
                      }
                }
                onClick={() => {
                  updateVote("downVote");
                }}
              >
                {votes.downVotes}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Dashboard videos={videos} fetchVideoById={fetchVideoById} />
    </Box>
  );
}

export default VideoPage;
