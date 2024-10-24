import { ProjectApi, ProjectResponse } from "@/api";
import TiptapDisplay from "@/components/TipTapDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuthConfig from "@/hooks/useAuthConfig";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Tag,
  TimerIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const config = useAuthConfig();
  const projectApi = new ProjectApi(config);
  const [project, setProject] = useState<ProjectResponse>({});

  const fetchProjectById = async (id: number) => {
    try {
      const response = await projectApi.getProjectById(id);
      const project = response.data;
      setProject(project);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) fetchProjectById(Number(id));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Card className="lg:w-2/3 w-full p-5 dark:bg-transparent">
        <h1 className="lg:text-3xl md:text-xl text-lg">{project.title}</h1>
        <div className="grid md:grid-cols-3 grid-cols-1">
          {project.posted && (
            <h1 className="text-sm mt-3 text-slate-500 dark:text-slate-400">
              {new Date(project.posted).toDateString()}
            </h1>
          )}
        </div>
        {project.description && (
          <div className="mt-3">
            <TiptapDisplay description={project.description} />
          </div>
        )}
      </Card>
      <div className="lg:w-1/3 w-full">
        <Card className="flex flex-col p-5 gap-3 dark:bg-transparent">
          <Link to={`/proposals/${project.id}/send`}>
            <Button className="w-full">Send a proposal</Button>
          </Link>

          <div className="flex flex-row justify-between items-center">
            <h1 className="flex gap-2 items-center">
              <Tag className="h-4 w-4" /> Price
            </h1>
            <h1 className="text-primary">${project.price}.00</h1>
          </div>

          <div className="flex flex-row justify-between items-center">
            <h1 className="flex gap-2 items-center">
              <TimerIcon className="h-4 w-4" /> Duration
            </h1>
            {project.period && (
              <h1 className="text-primary">
                {capitalizeFirstLetter(project.period)}
              </h1>
            )}
          </div>

          <div className="flex flex-row justify-between items-center">
            <h1 className="flex gap-2 items-center">
              <BriefcaseBusiness className="h-4 w-4" /> Experience
            </h1>
            {project.level && (
              <h1 className="text-primary">
                {capitalizeFirstLetter(project.level)}
              </h1>
            )}
          </div>
          <h3 className="text-sm mt-5">About the cutomer</h3>
          <h1>{project.customer?.name}</h1>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
