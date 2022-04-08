import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Layout
import Header from "./component/Header";
import Menu from "./component/Menu";
import Footer from "./component/Footer";
// Dashboards
import Dashboard from "./component/DeviceConfig/Dashboard";
import Dashboard2 from "./component/EmployInfo/Dashboard2";
import Dashboard3 from "./component/Dashboard/Dashboard3";
import Dashboard4 from "./component/Logs/Dashboard4";
import AttendenceDashboard from "./component/Attendence/AttendenceDashboard";
import UserInfoDashboard from "./component/UserInfo/UserInfoDashboard";
import ColorDashboard from "./component/ColorConfig/ColorDashboard";
// Auth
import Auth from "./component/Auth";
import "./App.css";

function App() {
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    var newRetrived = localStorage.getItem("authUser");
    if (newRetrived) {
      setisLogin(true);
    }
  }, []);

  if (isLogin) {
    return (
      <div className="wrapper">
        <Menu />
        <Header setisLogin={setisLogin} />
        <Routes>
          <Route path="config" element={<Dashboard />} />
          <Route path="info" element={<Dashboard2 />} />
          <Route path="/" element={<Dashboard3 />} />
          <Route path="log" element={<Dashboard4 />} />
          <Route path="attendence" element={<AttendenceDashboard />} />
          <Route path="colorconfig" element={<ColorDashboard />} />
          <Route
            path="login"
            element={<UserInfoDashboard setisLogin={setisLogin} />}
          />
        </Routes>
        <Footer />
      </div>
    );
  } else {
    return <Auth setisLogin={setisLogin} />;
  }
}

export default App;
