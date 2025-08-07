import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import ojpStore from "./store/ojpStore.js";
import RegistrationComponent from "./components/RegistrationComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import SeekerDashboard from "./components/SeekerDashboard.jsx";
import SeekerProfile from "./components/SeekerProfile.jsx";
import SeekerEducationSection from "./components/SeekerEducationComponent.jsx";
import Logout from "./components/logout.jsx";
import AllJobs from "./components/AllJobs.jsx";
import SeekerAppliedJobs from "./components/SeekerAppliedJobs.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import AdminAllUsers from "./components/AdminDashboard/AdminAllUsers.jsx";
import AdminAllJobs from "./components/AdminDashboard/AdminAllJobs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginComponent />
      },
      {
        path: "/register",
        element: <RegistrationComponent />
      }
    ]
  },
  {
    path: "/seeker",
    element: <SeekerDashboard />
  },
  {
    path: "/seeker/profile",
    element: <SeekerProfile />
  },
  {
    path: "/seeker/add-education",
    element: <SeekerEducationSection />
  },
  {
    path: "/seeker/logout",
    element: <Logout />
  },
  {
    path: "/seeker/jobs",
    element: <AllJobs />
  },
  {
    path: "/seeker/appliedjobs",
    element: <SeekerAppliedJobs/>
  },


  
    {
      path: "/admin",
      element:<AdminDashboard/>
    },
    {
      path: "/admin/allusers",
      element:<AdminAllUsers/>
    },
    {
      path: "/admin/alljobs",
      element:<AdminAllJobs/>      
    }
  ])




createRoot(document.getElementById("root")).render(
  <Provider store={ojpStore} >
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
);
