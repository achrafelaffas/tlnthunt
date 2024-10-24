import { createBrowserRouter } from "react-router-dom";
import Layout from "./Dashboard/Layout";
import Register from "./auth/register/Register";
import Activate from "./auth/activate/Activate";
import Login from "./auth/login/Login";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Projects from "./pages/projects/Projects";
import New from "./pages/projects/New";
import ProjectDetails from "./pages/projects/ProjectDetails";
import SendProposal from "./pages/proposals/SendProposal";
import MyProjects from "./pages/projects/MyProjects";
import Proposals from "./pages/proposals/Proposals";
import ProposalDetails from "./pages/proposals/ProposalDetails";

export const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/activate", element: <Activate /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <RequireAuth fallbackPath="/login">
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: "/projects", element: <Projects /> },
      { path: "/projects/new", element: <New /> },
      { path: "/my-projects", element: <MyProjects /> },
      { path: "/projects/:id/details", element: <ProjectDetails /> },
      { path: "/proposals/:id/send", element: <SendProposal /> },
      { path: "/proposals", element: <Proposals /> },
      { path: "/proposals/:id/details", element: <ProposalDetails /> },
    ],
  },
]);
