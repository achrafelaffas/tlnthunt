import { useEffect, useState } from "react";

const Error = ({ error }: { error: string }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="h-[85vh] w-full flex justify-center items-center">
      {isOnline ? (
        <h1 className="flex flex-row gap-3">{error}</h1>
      ) : (
        <h1 className="flex flex-row gap-3">
          You're offline! Please check your internet connection
        </h1>
      )}
    </div>
  );
};

export default Error;
