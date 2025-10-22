
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import './App.css'
import FarmerDashboard from "./pages/FarmerDashboard";
import Footer from "./components/Footer";



const Layout = () => {
  const location = useLocation();

  // const hideNavbarPaths = ["/SignUp", "/Login", "/VetDashboard", "/PetOwnerDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard"];
  const hideFooterPaths = ["/Signup", "/Login", "/FarmerDashboard", "/ClientDashboard", "/AdminDashboard", "/Notifications", "/PasswordResetModal", "/Dashboard", "/PaymentPage"];
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

const FarmerDashboardLayout = () => (
  <>
    <Routes>
      <Route path="/FarmerDashboard" element={<FarmerDashboard />} />
    </Routes>
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

  const isFarmerDashboardRoute = location.pathname.startsWith("/FarmerDashboard");
  const isPetOwnerDashboardRoute = location.pathname.startsWith("/PetOwnerDashboard");



  if (isFarmerDashboardRoute) {
    return <FarmerDashboardLayout />;
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
