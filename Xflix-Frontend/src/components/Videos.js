import Header from "./Header";
import GenrePanel from "./GenrePanel";
import Dashboard from "./Dashboard";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";

function Videos() {
  const { enqueueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const [stateCat, setStateCat] = useState({
    genres: [
      { id: 0, genre: "All Genre", status: true },
      { id: 1, genre: "Education", status: false },
      { id: 2, genre: "Sports", status: false },
      { id: 3, genre: "Comedy", status: false },
      { id: 4, genre: "Lifestyle", status: false },
    ],
  });
  const [selected, setSelected] = useState("Any Age Group");
  const [sortedValue, setSortedValue] = useState("releaseDate");
  const ages = ["Any Age Group", "7+", "12+", "16+", "18+"];
  const [isLoading, setLoadingValue] = useState(true);
  const [timerId, setTimerId] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    let url = generateFinalURL();
    fetchVideos(url);
  }, [stateCat, selected, sortedValue]);

  useEffect(() => {
    let url;
    if (searchKey.length === 0) {
      return;
    } else {
      url = generateFinalURL();
    }

    debounceVideoSearch(searchKey, url);
  }, [searchKey]);

  const fetchVideos = async (url) => {
    try {
      let res = await axios.get(url);
      let data = await res.data;
      setVideos(data.videos);
      if (data) {
        setLoadingValue(false);
      }
    } catch (err) {
      enqueueSnackbar("" + err.response.data.message, { variant: "error" });
    }
  };

  const generateFinalURL = () => {
    let url;

    if (stateCat.genres[0].status === true && selected === "Any Age Group") {
      //When both are true
      if (searchKey.length > 0) {
        url =
          config.endpoint +
          "/v1/videos?genres=All&sortBy=" +
          sortedValue +
          "&title=" +
          searchKey;
      } else {
        url = config.endpoint + "/v1/videos?genres=All&sortBy=" + sortedValue;
      }
    } else if (
      stateCat.genres[0].status === true &&
      selected !== "Any Age Group"
    ) {
      //when one is true, other is false
      let selectedVal = selected.split("+").join("");
      if (searchKey.length > 0) {
        url =
          config.endpoint +
          "/v1/videos?sortBy=" +
          sortedValue +
          "&contentRating=" +
          selectedVal +
          "%2B&title=" +
          searchKey;
      } else {
        url =
          config.endpoint +
          "/v1/videos?sortBy=" +
          sortedValue +
          "&contentRating=" +
          selectedVal +
          "%2B";
      }
    } else if (
      stateCat.genres[0].status === false &&
      selected === "Any Age Group"
    ) {
      //When one is false, other is true
      if (searchKey.length > 0) {
        url =
          fetchGenresURL(stateCat.genres) +
          "&sortBy=" +
          sortedValue +
          "&title=" +
          searchKey;
      } else {
        url = fetchGenresURL(stateCat.genres) + "&sortBy=" + sortedValue;
      }
    } else {
      //When both are false
      // else(stateCat.genres[0].status===false && selected !=="Any Age Group"){
      let selectedVal = selected.split("+").join("");
      if (searchKey.length > 0) {
        url =
          fetchGenresURL(stateCat.genres) +
          "&sortBy=" +
          sortedValue +
          "&title=" +
          searchKey +
          "&contentRating=" +
          selectedVal +
          "%2B";
      } else {
        url =
          fetchGenresURL(stateCat.genres) +
          "&sortBy=" +
          sortedValue +
          "&contentRating=" +
          selectedVal +
          "%2B";
      }
    }

    return url;
  };

  const fetchGenresURL = (genres) => {
    // console.log("Genres: \n"+genres);
    let values = [];

    for (let i = 0; i < genres.length; i++) {
      if (genres[i].status) {
        values.push(genres[i].genre);
      }
    }

    let str = values.join(",");
    let url = config.endpoint + "/v1/videos?genres=" + str;
    console.log(url);
    return url;
  };

  const selectCategory = (e) => {
    console.log(e.target.value);

    let updatedlist = stateCat.genres.map((item) => {
      if (parseInt(e.target.value) === 0) {
        //if target value is first button
        if (item.id !== 0) {
          return { ...item, status: false }; //set all the other buttons status to false
        } else {
          return { ...item, status: true }; //set the first buttons status to true
        }
      } else if (item.id === parseInt(e.target.value)) {
        //if target element value is not anything else other than 0, toggle its status
        if (stateCat.genres[0].status === true) {
          stateCat.genres[0].status = false;
        }
        return { ...item, status: !item.status };
      } else {
        if (item.id === 0) {
          //When you encounter first button set its status to false because some other button is the target
          return { ...item, status: false };
        }
      }
      return item;
    });

    let cnt = 0;
    updatedlist.map((el) => {
      if (el.status === false) {
        cnt++;
      }
    });
    console.log("count: " + cnt);
    if (cnt === 5) {
      updatedlist[0].status = true;
    }
    setStateCat({ genres: updatedlist });
  };

  const ToggleValues = (e) => {
    if (e.target.value === "releaseDate") {
      setSortedValue("viewCount");
    }

    if (e.target.value === "viewCount") {
      setSortedValue("releaseDate");
    }
  };

  const selectAgeGroup = (e) => {
    setSelected(e.target.value);
  };

  const debounceVideoSearch = (searchText, url) => {
    clearTimeout(timerId);

    let newTimerId = setTimeout(() => {
      fetchVideos(url);
    }, 500);

    setTimerId(newTimerId);
  };

  const updateSearchKey = (text) => {
    setSearchKey(text);
  };

  return (
    <div className="Videos">
      <Header
        searchVisible={true}
        uploadVisible={true}
        fetchVideos={fetchVideos}
        updateSearchKey={updateSearchKey}
      />
      <GenrePanel
        sortedValue={sortedValue}
        selected={selected}
        selectAgeGroup={selectAgeGroup}
        selectCategory={selectCategory}
        stateCat={stateCat}
        ages={ages}
        ToggleValues={ToggleValues}
      />
      {isLoading ? (
        <Box className="circular-progress">
          <CircularProgress />
          Loading Videos
        </Box>
      ) : (
        <Dashboard videos={videos} />
      )}
    </div>
  );
}

export default Videos;
