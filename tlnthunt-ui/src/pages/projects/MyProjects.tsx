import { ProjectApi, ProjectResponse } from "@/api";
import { Button } from "@/components/ui/button";
import useAuthConfig from "@/hooks/useAuthConfig";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import MyProjectCard from "./MyProjectCard";

const MyProjects = () => {
  const config = useAuthConfig();
  const projectApi = new ProjectApi(config);
  const [projects, setProjects] = useState<ProjectResponse[]>([]);

  const fetchProject = async () => {
    await projectApi.getAllProjectsByUser().then(
      (response) => setProjects(response.data),
      (error) => Error(error)
    );
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center text-2xl">My Projets</h1>
        <Link to="/projects/new">
          <Button className="flex gap-1 w-full h-full">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>
      <div className="max-h-[83vh] min-h-[83vh] flex flex-col gap-2 overflow-scroll scrollbar-hide">
        {projects.map((p) => (
          <div key={p.id}>
            <MyProjectCard project={p} />
            {projects[projects.length - 1] !== p && (
              <DropdownMenuSeparator className="my-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
