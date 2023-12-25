import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, MenuItem, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./UploadVideo.css";

const VideoUpload = (props) => {
  const { open, handleClose, handleCancel } = props;

  const allGenres = ["Education", "Sports", "Lifestyle", "Comedy"];
  const ageArray = ["7+", "12+", "16+", "18+"];

  const uploadVideoData = () => {};

  const handleChange = (e) => {
    if (e.target.name === "videoLink") {
    }

    if (e.target.value) {
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ color: "#383838" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <DialogTitle sx={{ fontWeight: "400" }}>Upload Video</DialogTitle>
          <Box paddingRight="24px" color="#FFF">
            <span onClick={() => handleClose()} style={{ cursor: "pointer" }}>
              <CloseIcon />
            </span>
          </Box>
        </Stack>
        <DialogContent>
          <Stack spacing={2} paddingBottom={2} direction="column">
            <TextField
              className="form-element"
              id="outlined-helpertext"
              label="Video Link"
              name="videoLink"
              value={""}
              onChange={(e) => {
                handleChange(e);
              }}
              helperText="This link will be used to derive the video"
              fullWidth
            />
            <TextField
              className="form-element"
              id="outlined-helpertext"
              label="Thumbnail Image Link"
              name="previewImage"
              onChange={(e) => {
                handleChange(e);
              }}
              helperText="This link will be used to preview the thumbnail image"
              fullWidth
            />
            <TextField
              className="form-element"
              id="outlined-helpertext"
              label="Title"
              name="title"
              onChange={(e) => {
                handleChange(e);
              }}
              helperText="This link will be used to derive the video"
              fullWidth
            />

            <TextField
              className="form-element"
              id="outlined-helpertext"
              select
              label="Suitable age group for the clip"
              name="contentRating"
              helperText="This will be used to filter videos on age group suitablity"
              fullWidth
            >
              {ageArray.map((age) => (
                <MenuItem key={age} value={age}>
                  {age}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Release Date"
              helperText="This will be used to sort videos"
              renderInput={(params) => (
                <TextField {...params} className="form-element" />
              )}
            />
          </Stack>
        </DialogContent>
        <Stack
          direction="row"
          justifyContent="flex-start"
          paddingBottom={2}
          px={3}
        >
          <Button
            variant="contained"
            style={{ color: "#FFF" }}
            sx={{
              backgroundColor: "#EE1520",
              fontSize: "13px",
              ":hover": { backgroundColor: "#EE1520" },
            }}
            onClick={() => {
              uploadVideoData();
            }}
          >
            UPLOAD VIDEO
          </Button>
          <Box onClick={handleCancel} className="cancel">
            CANCEL
          </Box>
        </Stack>
      </Dialog>
    </div>
  );
};

export default VideoUpload;
