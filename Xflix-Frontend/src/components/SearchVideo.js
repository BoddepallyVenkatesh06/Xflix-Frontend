import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchVideo = (props) => {
  const handleChange = (e) => {
    let text = e.target.value;
    props.updateSearchKey(text);
  };

  return (
    <Box className="search-box">
      <TextField
        className="search-field"
        size="small"
        fullWidth
        sx={{
          input: {
            color: "#FFFFFF",
            borderColor: "grey",
            outlineColor: "grey",
          },
          background: "#121212",
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "gray" },
          },
          "&:hover": {
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "gray" },
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ paddingRight: 0 }} position="end">
              {/* <Button variant="text" sx= {{background: "#313131", width:'100%'}} endIcon={<Search sx={{ color: 'gray' }}/>}></Button> */}
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
        }}
        value={props.searchKey}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </Box>
  );
};

export default SearchVideo;
