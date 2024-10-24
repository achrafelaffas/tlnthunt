import { Configuration } from "@/api/configuration";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const useAuthConfig = () => {
  const acccessToken = useAuthHeader();
  const config = new Configuration();
  config.accessToken = acccessToken ? acccessToken.replace("Bearer ", "") : "";
  return config;
};

export default useAuthConfig;
