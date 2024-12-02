import { Configuration } from "@/api/configuration";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useAuthConfig = () => {
  const acccessToken = useAuthHeader();
  const config = new Configuration();
  config.accessToken = acccessToken ? acccessToken.replace("Bearer ", "") : "";
  config.basePath = "https://tlnthunt-production.up.railway.app/api/v1";
  return config;
};

export default useAuthConfig;
