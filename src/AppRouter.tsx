
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import './App.css'

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// FarmerDashboard PAGES
import FarmerDashboard from "./pages/FarmerDashboard/FarmerDashboard";
import Detection from "./pages/FarmerDashboard/Detection";
import Crops from "./pages/FarmerDashboard/Crops";
import Billing from "./pages/FarmerDashboard/Billing";
import Settings from "./pages/FarmerDashboard/Settings";
import Profile from "./pages/FarmerDashboard/Profile";
import Messages from "./pages/FarmerDashboard/Messages";
import Reports from "./pages/FarmerDashboard/Reports";
import Orders from "./pages/FarmerDashboard/Orders";
import Transactions from "./pages/FarmerDashboard/Transactions";
import Help from "./pages/FarmerDashboard/Help";

// BuyerDashboard PAGES
import BuyerDashboard from "./pages/BuyerDashboard/BuyerDashboard";

// OrgDashboard PAGES
import OrgDashboard from "./pages/OrgDashboard/OrgDashboard";
import APIKeys from "./pages/OrgDashboard/APIKeys";
import Docs from "./pages/OrgDashboard/Docs";
import OrgSettings from "./pages/OrgDashboard/Settings";
import OrgBilling from "./pages/OrgDashboard/Billing";
import Notifications from "./pages/FarmerDashboard/Notifications";

// CoopDashboard PAGES
import CoopDashboard from "./pages/CoopDashboard/CoopDashboard";
import Members from "./pages/CoopDashboard/Members";
import CoopAnalytics from "./pages/CoopDashboard/Analytics";
import CoopTransactions from "./pages/CoopDashboard/Transactions";



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
      <Route path="/FarmerDashboard/Orders" element={<Orders />} />
      <Route path="/FarmerDashboard/Transactions" element={<Transactions />} />
      <Route path="/FarmerDashboard/Help" element={<Help />} />
    </Routes>
  </>
);


const CoopDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/CoopDashboard" element={<CoopDashboard />} /> 
      <Route path="/CoopDashboard/Members" element={<Members />} /> 
      <Route path="/CoopDashboard/Analytics" element={<CoopAnalytics />} /> 
      <Route path="/CoopDashboard/Transactions" element={<CoopTransactions />} /> 
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
      <Route path="/OrgDashboard/APIKeys" element={<APIKeys />} />
      <Route path="/OrgDashboard/Docs" element={<Docs />} />
      <Route path="/OrgDashboard/Settings" element={<OrgSettings />} />
      <Route path="/OrgDashboard/Billing" element={<OrgBilling />} />
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
