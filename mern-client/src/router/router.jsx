import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import About from "../Components/About";
import Dashboard from "../dashboard/Dashboard";
import DashboardLayout from "../dashboard/DashboardLayout";
import PatientDetails from "../dashboard/PatientDetails";
import FoodCharts from "../dashboard/FoodCharts";
import PantryManagement from "../dashboard/PantryManagement";
import MealTracking from "../dashboard/MealTracking";
import Dashboard_2 from "../dashboard_2/Dashboard_2";
import { BASE_URL } from "../helper";
import Signup from "../Components/Signup";
import FoodManagerLogin from "../Components/FoodManagerLogin"; // Import your FoodManagerLogin component
import InnerPantryLogin from "../Components/InnerPantryLogin"; // Import your InnerPantryLogin component
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../Components/Logout";
import Review from "../home/Review";
import MealPreparation from "../dashboard_2/MealPreparation";
import DashboardLayout_2 from "../dashboard_2/DashboardLayout_2";
import AddPatients from "../dashboard/AddPatients";
import AddStaff from "../dashboard/AddStaff";
import FoodManagement from "../dashboard/FoodManagement";
import AddDeliveryPersonnel from "../dashboard_2/AddDeliveryPersonnel";
import DeliveryManagement from "../dashboard_2/DeliveryManagement";
import DeliveryRecord from "../dashboard_2/DeliveryRecord";
import MyFooter from "../Components/MyFooter";
import EditPatient from "../dashboard/EditPatient";

// Function to fetch book data
const fetchBook = async ({ params }) => {
  const response = await fetch(`${BASE_URL}/${params.id}`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "footer",
        element: <MyFooter />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "login/food-manager",
        element: <FoodManagerLogin />, // New route for food-manager login
      },
      {
        path: "login/inner-pantry",
        element: <InnerPantryLogin />, // New route for inner-pantry login
      },
    ],
  },
  {
    path: "/food-manager/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/food-manager/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/add-patients",
        element: (
          <PrivateRoute>
            <AddPatients />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/edit-patient/:id",
        element: (
          <PrivateRoute>
            <EditPatient />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/add-staff",
        element: (
          <PrivateRoute>
            <AddStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/patients",
        element: (
          <PrivateRoute>
            <PatientDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/food-manager/dashboard/food-charts",
        element: (
          <PrivateRoute>
            <FoodCharts />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/pantry-management",
        element: (
          <PrivateRoute>
            <PantryManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/food-management",
        element: (
          <PrivateRoute>
            <FoodManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/food-manager/dashboard/meal-tracking",
        element: (
          <PrivateRoute>
            <MealTracking />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/inner-pantry/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout_2 />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/inner-pantry/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard_2 />
          </PrivateRoute>
        ),
      },
      {
        path: "/inner-pantry/dashboard/meal-preparation",
        element: (
          <PrivateRoute>
            <MealPreparation />
          </PrivateRoute>
        ),
      },
      {
        path: "/inner-pantry/dashboard/add-delivery-personnel",
        element: (
          <PrivateRoute>
            <AddDeliveryPersonnel />
          </PrivateRoute>
        ),
      },
      {
        path: "/inner-pantry/dashboard/delivery-record",
        element: (
          <PrivateRoute>
            <DeliveryRecord />
          </PrivateRoute>
        ),
      },
      {
        path: "/inner-pantry/dashboard/delivery-management",
        element: (
          <PrivateRoute>
            <DeliveryManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/inner-pantry/dashboard/meal-tracking",
        element: (
          <PrivateRoute>
            <MealTracking />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
