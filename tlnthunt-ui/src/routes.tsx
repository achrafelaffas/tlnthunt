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
import MyProjectDetails from "./pages/projects/MyProjectDetails";
import EditProject from "./pages/projects/Edit";
import Chat from "./pages/Chat/Chat";

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
      { path: "/projects/:id/details", element: <ProjectDetails /> },

      { path: "/my-projects", element: <MyProjects /> },
      { path: "/my-projects/:id/details", element: <MyProjectDetails /> },
      { path: "/my-projects/:id/edit", element: <EditProject /> },

      { path: "/proposals/:id/send", element: <SendProposal /> },
      { path: "/proposals", element: <Proposals /> },
      { path: "/proposals/:id/details", element: <ProposalDetails /> },

      { path: "/video-call", element: <Chat /> },
    ],
  },
]);
