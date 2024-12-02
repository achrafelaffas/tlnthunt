import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[80vh] w-full flex-col items-center rounded-md justify-center">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-4xl font-bold md:text-6xl">
          Welcome to <span className="">TlntHunt</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl">
          Unlock your potential, connect with opportunities, and grow with us.
        </p>
        <div className="mt-8 flex gap-4 w-full justify-center">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button variant="outline" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
