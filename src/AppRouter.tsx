
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import './App.css'
import FarmerDashboard from "./pages/FarmerDashboard/FarmerDashboard";
import Footer from "./components/Footer";
import CoopDashboard from "./pages/CoopDashboard/CoopDashboard";
import BuyerDashboard from "./pages/BuyerDashboard/BuyerDashboard";
import Navbar from "./components/Navbar";
import OrgDashboard from "./pages/OrgDashboard/OrgDashboard";
import Notifications from "./pages/FarmerDashboard/Notifications";

// FarmerDashboard PAGES
import Detection from "./pages/FarmerDashboard/Detection";
import Crops from "./pages/FarmerDashboard/Crops";
import Billing from "./pages/FarmerDashboard/Billing";
import Settings from "./pages/FarmerDashboard/Settings";
import Profile from "./pages/FarmerDashboard/Profile";
import Messages from "./pages/FarmerDashboard/Messages";
import Reports from "./pages/FarmerDashboard/Reports";

const Layout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/SignUp", "/Login", "/VetDashboard", "/PetOwnerDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard", "/OrgDashboard"];
  const hideFooterPaths = ["/SignUp", "/Login", "/FarmerDashboard", "/CoopDashboard", "/BuyerDashboard",  "/OrgDashboard", "/AdminDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard", "/PaymentPage"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div className="bodyDiv">
      {shouldShowNavbar && <Navbar />} 

      <Routes>
        <Route path="/" index element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

const FarmerDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/FarmerDashboard" element={<FarmerDashboard />} />
      <Route path="/FarmerDashboard/Detection" element={<Detection />} />
      <Route path="/FarmerDashboard/Crops" element={<Crops />} />
      <Route path="/FarmerDashboard/Billing" element={<Billing />} />
      <Route path="/FarmerDashboard/Settings" element={<Settings />} />
      <Route path="/FarmerDashboard/Profile" element={<Profile />} />
      <Route path="/FarmerDashboard/Messages" element={<Messages />} />
      <Route path="/FarmerDashboard/Reports" element={<Reports />} />
    </Routes>
  </>
);


const CoopDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/CoopDashboard" element={<CoopDashboard />} /> 
    </Routes>
  </>
);


const BuyerDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/BuyerDashboard" element={<BuyerDashboard />} /> 
    </Routes>
  </>
);


const OrgDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/OrgDashboard" element={<OrgDashboard />} /> 
    </Routes>
  </>
);

const NotificationsLayout = () => (
  <>
    <Routes>
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  </>
);
const AppRouter = () => {
  const location = useLocation();

  const isFarmerDashboardRoute = location.pathname.startsWith("/FarmerDashboard");
  const isCoopDashboardRoute = location.pathname.startsWith("/CoopDashboard");
  const isBuyerDashboardRoute = location.pathname.startsWith("/BuyerDashboard");
  const isOrgDashboardRoute = location.pathname.startsWith("/OrgDashboard");
  const isNotificationsRoute = location.pathname.startsWith("/notifications");


  if (isFarmerDashboardRoute) {
    return <FarmerDashboardLayout />;
  } 
  else if (isCoopDashboardRoute) {
    return <CoopDashboardLayout />;
  } 
  else if (isBuyerDashboardRoute) {
    return <BuyerDashboardLayout />; 
  }
  else if (isOrgDashboardRoute) {
    return <OrgDashboardLayout />; 
  }
  else if (isNotificationsRoute) {
    return <NotificationsLayout />;
  }
  else {
    return <Layout />;
  }
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
