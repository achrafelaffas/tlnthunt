import { ProjectResponse } from "@/api";
import TiptapDisplay from "@/components/TipTapDisplay";
import { Card } from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { postedXAgo } from "@/Time";
import { Clock10, Eye, Tag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }: { project: ProjectResponse }) => {
  const api = useApi();
  const date = project.posted ? new Date(project.posted) : null;
  let posted = date && postedXAgo(date);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const addView = (id: number) => {
    api.projectApi.addProjectView(id).catch((e) => console.log(e));
  };

  return (
    <Card className="my-0 py-8 rounded-none bg-transparent border-0">
      <h2 className="text-2xl font-semibold text-primary">
        <Link
          onClick={() => project.id && addView(project.id)}
          to={`/projects/${project.id}/details`}
          className="hover:underline"
        >
          {project.title}
        </Link>
      </h2>
      {project.description && (
        <div className={`mt-4 ${!isExpanded ? "line-clamp-2" : ""}`}>
          <TiptapDisplay description={project.description} />
        </div>
      )}
      <button onClick={toggleDescription} className="text-blue-500 mt-2">
        {isExpanded ? "Show Less" : "Show More"}
      </button>
      <div className="flex justify-start items-center gap-3">
        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <Clock10 className="h-4 w-4" /> {posted && posted}
        </p>
        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <Tag className="h-4 w-4" /> ${project.price}.00
        </p>
        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <Eye className="h-4 w-4" /> {project.views}
        </p>
      </div>
    </Card>
  );
};

export default ProjectCard;
