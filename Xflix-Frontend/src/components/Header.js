import "./Header.css";
import { Box, Button } from "@mui/material";
import SearchVideo from "./SearchVideo";
import { Link } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import UploadVideo from "./UploadVideo";

function Header(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="header">
      <Box onClick={() => history.push("/")} className="logo">
        <img
          src="https://xflix-frontend7.vercel.app/xlogo.png"
          alt="xflix-con"
        ></img>
      </Box>
      <Box className="logo-div"></Box>
      {props.searchVisible === true ? (
        <SearchVideo updateSearchKey={props.updateSearchKey} />
      ) : (
        ""
      )}
      {props.uploadVisible === true ? (
        <Box>
          <Box className="upload-button-div">
            <Button
              className="upload-button"
              variant="contained"
              sx={{ color: "#ffff", background: "#4CA3FC" }}
              startIcon={<FileUploadIcon />}
              onClick={handleClickOpen}
            >
              Upload
            </Button>
          </Box>
          {/* <UploadVideo open={open} handleClose={handleClose} /> */}
          <UploadVideo
            open={open}
            handleClose={handleClose}
            fetchVideos={props.fetchVideos}
          />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default Header;
