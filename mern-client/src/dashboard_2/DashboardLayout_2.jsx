import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const DashboardLayout_2 = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Outlet /> {/* Renders the matched child route */}
      </div>
    </div>
  );
};

export default DashboardLayout_2;
