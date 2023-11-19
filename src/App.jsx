import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import DirectoryDetails from "./pages/DirectoryDetails/DirectoryDetails";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<DirectoryDetails />} />
        <Route exact path="/:id" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
