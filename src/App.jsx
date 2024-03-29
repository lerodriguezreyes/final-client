import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import BillLookup from "./pages/BillLookup";
import Community from "./pages/Community";
import Forum from "./pages/Forum";
import BillDetails from "./pages/BillDetails";
import UserDashboard from "./pages/UserDashboard"
import Error from "./pages/Error"

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dadaists" element={<Community />} />
        <Route path="/billlookup" element={<BillLookup />} />
        <Route path="/details" element={<BillDetails />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="*" element={<Error />} />
        

        <Route element={<LoggedIn />}></Route>

        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
