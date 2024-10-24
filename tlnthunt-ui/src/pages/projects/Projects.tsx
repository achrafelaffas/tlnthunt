import ProjectCard from "./ProjectCard";
import useAuthConfig from "@/hooks/useAuthConfig";
import { useEffect, useState } from "react";
import { CategoryApi, CategoryDTO, ProjectApi, ProjectResponse } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchRequest {
  keyword: string;
}

const Projects = () => {
  const config = useAuthConfig();
  const projectApi = new ProjectApi(config);
  const categoryApi = new CategoryApi(config);
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const fetchProject = async () => {
    try {
      const response = await projectApi.getAllProjects();
      setProjects(response.data);
    } catch (error) {}
  };

  const fetchProjectByCategory = async (id: number) => {
    try {
      const response = await projectApi.getAllProjectsByCategory(id);
      setProjects(response.data);
    } catch (error) {}
  };

  const fecthCategories = async () => {
    await categoryApi.getAllCategories().then(
      (response) => setCategories(response.data),
      (error) => Error(error)
    );
  };

  const { register, handleSubmit } = useForm<SearchRequest>();

  const searchProjects = async ({ keyword }: SearchRequest) => {
    await projectApi.searchProjects(keyword).then(
      (response) => setProjects(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fetchProject();
    fecthCategories();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-3 flex-col lg:flex-row">
        <form
          className="lg:w-1/3 w-full"
          onSubmit={handleSubmit(searchProjects)}
        >
          <div className="flex h-9 items-center bg-white dark:bg-transparent rounded-md border p-4 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
            <Input
              {...register("keyword")}
              type="text"
              className="w-full p-2 focus-visible:ring-0 border-0 bg-transparent"
              placeholder="Search projects"
            />
            <CornerDownLeft className="h-4 w-4 text-zinc-500" />
          </div>
        </form>
        <div className="flex scrollbar-hide overflow-scroll w-full gap-2">
          <Button variant="link" onClick={() => fetchProject()}>
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              variant="link"
              onClick={() => fetchProjectByCategory(c.id!)}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 overflow-scroll scrollbar-hide h-[70vh]",
          projects.length < 1 && "justify-center items-center"
        )}
      >
        {projects.length > 0 ? (
          projects.map((p) => <ProjectCard project={p} key={p.id} />)
        ) : (
          <>
            <p>There are no projects yet.</p>

            <Button onClick={() => fetchProject()} variant="link">
              find more work
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
