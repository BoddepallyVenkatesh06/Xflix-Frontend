import "./App.css";
import { Route, Switch } from "react-router-dom";
import Videos from "./components/Videos";
import VideoPage from "./components/VideoPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import ipconfig from "./ipConfig.json";

export const config = {
  endpoint: `https://content-xflix-backend.azurewebsites.net`,
};

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Switch>
          <Route exact path="/">
            <Videos />
          </Route>
          <Route exact path="/videopage/:id">
            <VideoPage />
          </Route>
        </Switch>
      </LocalizationProvider>
    </div>
  );
}

export default App;
