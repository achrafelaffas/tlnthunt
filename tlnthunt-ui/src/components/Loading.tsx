import { RotateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-[85vh] w-full flex justify-center items-center">
      <RotateLoader color="#acd8bc" />
    </div>
  );
};

export default Loading;
