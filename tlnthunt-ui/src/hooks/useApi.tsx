import { useMemo } from "react";
import useAuthConfig from "./useAuthConfig";
import { CategoryApi, ProjectApi } from "@/api";

const useApi = () => {
  const config = useAuthConfig();
  const projectApi = useMemo(() => new ProjectApi(config), [config]);
  const categoryApi = useMemo(() => new CategoryApi(config), [config]);

  return { projectApi, categoryApi };
};

export default useApi;
