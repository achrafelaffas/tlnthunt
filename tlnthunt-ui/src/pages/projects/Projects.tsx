import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { CategoryDTO, ProjectResponse } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import useApi from "@/hooks/useApi";
import Loading from "@/components/Loading";
import FecthError from "@/components/FecthError";

interface SearchRequest {
  keyword: string;
}

const Projects = () => {
  const api = useApi();
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await api.projectApi.getAllProjects();
      setProjects(response.data);
    } catch (error) {
      setError("Something happend while getting data! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectByCategory = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.projectApi.getAllProjectsByCategory(id);
      setProjects(response.data);
    } catch (error) {
      setError("Something happend while getting data! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fecthCategories = async () => {
    await api.categoryApi.getAllCategories().then(
      (response) => setCategories(response.data),
      (error) => Error(error)
    );
  };

  const { register, handleSubmit } = useForm<SearchRequest>();

  const searchProjects = async ({ keyword }: SearchRequest) => {
    setLoading(true);
    await api.projectApi
      .searchProjects(keyword)
      .then(
        (response) => setProjects(response.data),
        (error) => console.log(error)
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
    fecthCategories();
  }, []);

  if (loading) return <Loading />;

  if (error) return <FecthError error={error} />;

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
          <Button variant="default" onClick={() => fetchProject()}>
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              variant="default"
              onClick={() => fetchProjectByCategory(c.id!)}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "max-h-[83vh] min-h-[83vh] flex flex-col gap-2 overflow-scroll scrollbar-hide",
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
