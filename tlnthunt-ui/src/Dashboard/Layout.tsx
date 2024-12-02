import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex w-full flex-col dark:bg-black">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  p-4 md:gap-6 md:px-8 md:py-3">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
