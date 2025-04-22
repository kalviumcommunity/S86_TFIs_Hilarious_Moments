import React from "react";
import LandingPage from "./pages/LandingPage";
import Dashboardpage from "./components/Dashboardpage";
import UploadMomentPage from "./components/uploadfile";
import  {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <Routes>
      <Route path = "/" element={<LandingPage/>}/>
      <Route path = "/dashboard" element={<Dashboardpage/>}/>
      <Route path = "/upload" element={<UploadMomentPage/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/signup" element={<Signup/>}/>

    </Routes>
  );
}

export default App;
