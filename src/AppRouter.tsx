
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import './App.css'

import Footer from "./components/Footer";



const Layout = () => {
  const location = useLocation();

  // const hideNavbarPaths = ["/SignUp", "/Login", "/VetDashboard", "/PetOwnerDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard"];
  const hideFooterPaths = ["/SignUp", "/Login", "/ProviderDashboard", "/ClientDashboard", "/AdminDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard", "/PaymentPage"];
  // const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div className="bodyDiv">
      {/* {shouldShowNavbar && <Navbar />} */}

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

const VetDashboardLayout = () => (
  <>
    {/* <Routes>
      <Route path="/VetDashboard" element={<VetDashboard />} />
      
      <Route path="/VetDashboard/VetAppointments" element={<VetAppointments />} /> 
    </Routes> */}
  </>
);


const PetOwnerDashboardLayout = () => (
  <>
    {/* <Routes>
      <Route path="/PetOwnerDashboard" element={<PetOwnerDashboard />} />
      <Route path="/PetOwnerDashboard/PetOwnerPetsPage" element={<PetOwnerPetsPage />} /> 
      <Route path="/PetOwnerDashboard/PetOwnerAppointments" element={<PetOwnerAppointments />} /> 
      <Route path="/PetOwnerDashboard/PetProfile/:id" element={<PetProfile />} /> 
    </Routes> */}
  </>
);




const AppRouter = () => {
  const location = useLocation();

  const isVetDashboardRoute = location.pathname.startsWith("/VetDashboard");
  const isPetOwnerDashboardRoute = location.pathname.startsWith("/PetOwnerDashboard");



  if (isVetDashboardRoute) {
    return <VetDashboardLayout />;
  } else if (isPetOwnerDashboardRoute) {
    return <PetOwnerDashboardLayout />;
  } else {
    return <Layout />;
  }
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
