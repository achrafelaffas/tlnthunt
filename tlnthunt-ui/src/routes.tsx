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
import Dashboard from "./Dashboard/Dashboard";

export const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/activate", element: <Activate /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { element: <Dashboard />, index: true },
      {
        path: "/projects",
        element: (
          <RequireAuth fallbackPath="/login">
            <Projects />
          </RequireAuth>
        ),
      },
      {
        path: "/projects/new",
        element: (
          <RequireAuth fallbackPath="/login">
            <New />
          </RequireAuth>
        ),
      },
      {
        path: "/projects/:id/details",
        element: (
          <RequireAuth fallbackPath="/login">
            <ProjectDetails />
          </RequireAuth>
        ),
      },

      {
        path: "/my-projects",
        element: (
          <RequireAuth fallbackPath="/login">
            <MyProjects />
          </RequireAuth>
        ),
      },
      {
        path: "/my-projects/:id/details",
        element: (
          <RequireAuth fallbackPath="/login">
            <MyProjectDetails />
          </RequireAuth>
        ),
      },
      {
        path: "/my-projects/:id/edit",
        element: (
          <RequireAuth fallbackPath="/login">
            <EditProject />
          </RequireAuth>
        ),
      },

      {
        path: "/proposals/:id/send",
        element: (
          <RequireAuth fallbackPath="/login">
            <SendProposal />
          </RequireAuth>
        ),
      },
      {
        path: "/proposals",
        element: (
          <RequireAuth fallbackPath="/login">
            <Proposals />
          </RequireAuth>
        ),
      },
      {
        path: "/proposals/:id/details",
        element: (
          <RequireAuth fallbackPath="/login">
            <ProposalDetails />
          </RequireAuth>
        ),
      },

      {
        path: "/video-call",
        element: (
          <RequireAuth fallbackPath="/login">
            <Chat />
          </RequireAuth>
        ),
      },
    ],
  },
]);
