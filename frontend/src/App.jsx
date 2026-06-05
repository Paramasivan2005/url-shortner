import React from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Forgetpassword from "./pages/Forgetpassword";
import CreatePassword from "./pages/CreatePassword";


const App = () => {

  
  const router = createBrowserRouter(
    createRoutesFromElements (
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Content />}/>
      <Route path="login" element={<Login />}/>
      <Route path="signup" element={<Signup />}/>
      <Route path="profile" element={<Profile />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="forgetpassword" element={<Forgetpassword />}/>
      <Route path="password" element={<CreatePassword />}/>
      
    </Route>

    ),
  );
  return <RouterProvider router={router} />;
  
};

export default App;
