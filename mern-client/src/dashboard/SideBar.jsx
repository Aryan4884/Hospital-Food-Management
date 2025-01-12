import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import userImg from "../assets/profile.jpg";

const SideBar = () => {
  return (
    <Sidebar aria-label="Hospital Food Management Admin Sidebar">
      {/* Logo Section */}
      <Sidebar.Logo href="#" img={userImg} imgAlt="Admin Logo">
        <p>Food Manager</p>
      </Sidebar.Logo>

      {/* Sidebar Items */}
      <Sidebar.Items>
        {/* Main Navigation */}
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to="/food-manager/dashboard"
            icon={HiChartPie}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/food-manager/dashboard/add-patients"
            icon={HiUser} // Using a user icon for "Add Patient"
          >
            Add Patient
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/food-manager/dashboard/food-charts"
            icon={HiOutlineCloudUpload}
          >
            Food Charts
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/food-manager/dashboard/pantry-management"
            icon={HiShoppingBag}
          >
            Pantry Management
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/food-manager/dashboard/food-management"
            icon={HiShoppingBag}
          >
            Food Management
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/food-manager/dashboard/meal-tracking"
            icon={HiTable}
          >
            Meal Tracking
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="#" icon={HiUser}>
            Admin Settings
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/login/food-manager"
            icon={HiArrowSmRight}
          >
            Sign In
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        {/* Secondary Options */}
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
