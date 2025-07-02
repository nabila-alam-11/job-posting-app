import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/styles.css";
import JobDetails from "./pages/JobDetails.jsx";
import PostJob from "./pages/PostJob.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/job/job-details/:jobId", element: <JobDetails /> },
  {
    path: "/post-job",
    element: <PostJob />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
