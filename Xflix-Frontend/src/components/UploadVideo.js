import {
  Button,
  TextField,
  Box,
  Stack,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import "./UploadVideo.css";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { config } from "../App";
import axios from "axios";

const UploadVideo = (props) => {
  const { open, handleClose, fetchVideos } = props;
  // const [genre, setGenre] = useState('');
  // const [ageGroup, setAgeGroup] = useState('');
  const allGenres = ["Education", "Sports", "Lifestyle", "Comedy"];
  const ageArray = ["7+", "12+", "16+", "18+"];
  const [formFields, setFormFields] = useState({
    title: "",
    videoLink: "",
    thumbnailImageLink: "",
    age: "",
    genre: "",
    date: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "videoLink") {
      let embedURL = convertURLToEmbeddedURL(value);
      let id = embedURL.split("youtube.com/embed/")[1];
      setFormFields({
        ...formFields,
        videoLink: value,
        thumbnailImageLink: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      });
    } else if (name === "thumbnailImageLink") {
      setFormFields({ ...formFields, thumbnailImageLink: value });
    } else if (name === "title") {
      setFormFields({ ...formFields, title: value });
    } else if (name === "genre") {
      setFormFields({ ...formFields, genre: value });
    } else if (name === "age") {
      setFormFields({ ...formFields, age: value });
    } else {
      setFormFields({ ...formFields, date: value });
    }
  };

  const handleUploadClick = (formFields) => {
    //get date in `1 jan 2023` format
    let date = formatDate(formFields.date);

    //get URL in embedded format => `youtube.com/embed/<videoID>`
    let embedURL = convertURLToEmbeddedURL(formFields.videoLink);

    //ValidateInputs checks for edge cases for each input items in the form
    if (validateInputs(formFields, date, embedURL) === false) {
      return;
    }

    //This return the data object that we will upload to the backend
    let dataObj = createDataObject(formFields, date, embedURL);
    console.log(dataObj);

    //Making a post request and uploading data to the backend
    postData(dataObj);

    handleClose();
    fetchVideos(config.endpoint + "/v1/videos");
  };

  const postData = async (data) => {
    let url = config.endpoint + "/v1/videos";
    try {
      let res = await axios.post(url, data);
      if (res.data) {
        enqueueSnackbar("Video Uploaded", { variant: "success" });
      }
    } catch (err) {
      enqueueSnackbar("" + err, { variant: "error" });
    }
  };

  const createDataObject = (formFields, date, embedURL) => {
    let dataObj = {
      videoLink: embedURL,
      title: formFields.title,
      genre: formFields.genre,
      contentRating: formFields.age,
      releaseDate: date,
      previewImage: formFields.thumbnailImageLink,
    };

    return dataObj;
  };

  const validateInputs = (formFields, date, embedURL) => {
    if (embedURL === "INVALID_URL") {
      enqueueSnackbar("The Video Link provided is Invalid!", {
        variant: "error",
      });
      return false;
    } else if (!formFields.thumbnailImageLink.includes("https://")) {
      enqueueSnackbar("Copy paste the video link here as well", {
        variant: "error",
      });
      return false;
    } else if (formFields.genre === "") {
      enqueueSnackbar("You need to choose a valid genre from the dropdown", {
        variant: "error",
      });
      return false;
    } else if (formFields.age === "") {
      enqueueSnackbar(
        "You need to select a valid Content Rating from the dropdown ",
        { variant: "error" }
      );
      return false;
    } else if (date === "1 Feb 1970") {
      enqueueSnackbar("You need to select a valid date", { variant: "error" });
      return false;
    } else {
      return true;
    }
  };

  const formatDate = (date) => {
    var dateObj = new Date(date);
    var month = months[dateObj.getUTCMonth() + 1]; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let formattedDate = `${day} ${month} ${year}`;
    console.log(formattedDate);
    return formattedDate;
  };

  const convertURLToEmbeddedURL = (url) => {
    let embedURL;
    if (url.includes("https://www.youtube.com/watch?v=")) {
      embedURL = url.replace(
        "https://www.youtube.com/watch?v=",
        "youtube.com/embed/"
      );
    } else if (url.includes("https://youtu.be/")) {
      embedURL = url.replace("https://youtu.be/", "youtube.com/embed/");
    } else {
      console.log("invalid url");
      return "INVALID_URL";
    }

    return embedURL;
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogTitle className="dialog-title">
          <Box>Upload Video</Box>
          <Box>
            <Button
              startIcon={<CloseIcon fontSize="large" />}
              onClick={handleClose}
            ></Button>
          </Box>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Stack spacing={2} sx={{ p: 0.5 }}>
            <TextField
              name="videoLink"
              value={formFields.videoLink}
              className="form-element"
              label="Video Link"
              variant="outlined"
              helperText="This link will be used to derive the video"
              sx={{ borderColor: "#ffff" }}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <TextField
              name="thumbnailImageLink"
              value={formFields.thumbnailImageLink}
              label="Thumbnail Image Link"
              variant="outlined"
              helperText="This link will be used to preview the thumbnail image"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <TextField
              name="title"
              value={formFields.title}
              label="Title"
              variant="outlined"
              helperText="This title will be representative text for the video"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <TextField
              className="form-element"
              id="outlined-select"
              select
              label="Genre"
              name="genre"
              helperText="Genre will help in categorizing your videos"
              fullWidth
              value={formFields.genre}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            >
              {allGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className="form-element"
              id="outlined-helpertext"
              select
              label="Suitable age group for the clip"
              name="age"
              helperText="This will be used to filter videos on age group suitablity"
              fullWidth
              value={formFields.age}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            >
              {ageArray.map((age) => (
                <MenuItem key={age} value={age}>
                  {age}
                </MenuItem>
              ))}
            </TextField>
            <FormControl>
              <DatePicker
                label="Release Date"
                format="DD-MM-YYYY"
                helperText="This will be used to sort videos"
                onChange={(newValue) => {
                  setFormFields({ ...formFields, date: newValue });
                }}
                value={formFields.date}
                required
              />
              <FormHelperText>This will be used to sort videos</FormHelperText>
            </FormControl>
          </Stack>
        </DialogContent>
        <div className="dialog-actions">
          <Button
            sx={{
              backgroundColor: "#EE1520",
              fontSize: "13px",
              ":hover": { backgroundColor: "#EE1520" },
            }}
            onClick={(e) => {
              handleUploadClick(formFields);
            }}
            variant="contained"
          >
            Upload
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default UploadVideo;
