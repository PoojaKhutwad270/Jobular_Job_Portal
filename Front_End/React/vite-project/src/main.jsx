import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store.js";
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

// Recruiter components
import RecruiterNavbarLayout from "./components/RecruiterDashboard/RecruiterNavbarLayout.jsx";
import PostJob from "./components/RecruiterDashboard/PostJob.jsx";
import PostedJobs from "./components/RecruiterDashboard/PostedJobs.jsx";
import JobApplications from "./components/RecruiterDashboard/JobApplications.jsx";
import PostJobForm from "./components/RecruiterDashboard/PostJobForm.jsx";
import RecruiterHome from "./components/RecruiterDashboard/RecruterHome.jsx"
import PostedJobsList from "./components/RecruiterDashboard/PostedJobs.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
    path:"/RecruiterDashboard",
    element:<RecruiterNavbarLayout />,
    children:[
      {
        path:"/RecruiterDashboard",
        element:<RecruiterHome />
      },
      // {
      //   path:"Profile",
      //   element:<PostJobForm />  Profile component here
      // },
      {
        path:"PostJobForm",
        element:<PostJobForm />
      },
      {
        path:"PostedJobsList",
        element:<PostedJobsList />
      },
      {
        path:"JobApplications",
        element:<JobApplications />
      },
    ]
  }

]);


createRoot(document.getElementById("root")).render(
  <Provider store={ojpStore} >

    <RouterProvider router={router}/>
  </Provider>
  
);
