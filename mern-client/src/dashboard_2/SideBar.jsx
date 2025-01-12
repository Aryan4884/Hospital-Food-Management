import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiOutlineCloudUpload,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
  HiViewBoards,
} from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";
import userImg from "../assets/profile.jpg";

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar Navigation">
      {/* Logo Section */}
      <Sidebar.Logo href="#" img={userImg} imgAlt="User Profile Picture">
        <p className="font-bold text-lg">Inner Pantry</p>
      </Sidebar.Logo>

      {/* Main Navigation Links */}
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/inner-pantry/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/inner-pantry/dashboard/meal-preparation"
            icon={HiOutlineCloudUpload}
          >
            Meal Preparation
          </Sidebar.Item>
          <Sidebar.Item
            href="/inner-pantry/dashboard/delivery-management"
            icon={HiShoppingBag}
          >
            Delivery Management
          </Sidebar.Item>
          <Sidebar.Item
            href="/inner-pantry/dashboard/delivery-record"
            icon={HiShoppingBag}
          >
            Delivery Record
          </Sidebar.Item>
          <Sidebar.Item
            href="/inner-pantry/dashboard/add-delivery-personnel"
            icon={HiInbox}
          >
            Add Delivery Personnel
          </Sidebar.Item>
          <Sidebar.Item
            href="/inner-pantry/dashboard/meal-tracking"
            icon={HiUser}
          >
            Meal Tracking
          </Sidebar.Item>
          <Sidebar.Item href="/products" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/login/inner-pantry" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        {/* Secondary Links */}
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/upgrade" icon={HiViewBoards}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="/docs" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="/help" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
