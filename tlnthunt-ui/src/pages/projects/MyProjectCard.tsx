import { ProjectResponse } from "@/api";
import TiptapDisplay from "@/components/TipTapDisplay";
import { Card } from "@/components/ui/card";
import { postedXAgo } from "@/Time";
import { Clock10, Tag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }: { project: ProjectResponse }) => {
  const date = project.posted ? new Date(project.posted) : null;
  let posted = date && postedXAgo(date);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="my-0 py-8 rounded-none bg-transparent border-0">
      <h2 className="text-2xl font-semibold text-primary">
        <Link
          to={`/my-projects/${project.id}/details`}
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
      <div className="flex justify-between items-center">
        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <Clock10 className="h-4 w-4" /> {posted && posted}
        </p>
        <p className="mt-4 flex items-center gap-2">
          <Tag className="h-4 w-4" /> ${project.price}.00
        </p>
      </div>
    </Card>
  );
};

export default ProjectCard;
