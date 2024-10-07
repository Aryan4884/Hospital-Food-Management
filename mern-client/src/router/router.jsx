import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    useLoaderData,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import Blog from "../Components/Blog";
import About from "../Components/About";
import SingleBook from "../shop/SingleBook";
import Dashboard from "../dashboard/Dashboard";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import { BASE_URL } from '../helper';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Logout from '../Components/Logout';
// Function to fetch book data
const fetchBook = async ({ params }) => {
  const response = await fetch(`${BASE_URL}/${params.id}`);
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 });
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
        element: <Home />
      },
      {
        path: "shop",
        element: <Shop />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "book/:id",
        element: <SingleBook />,
        loader: fetchBook
      },
      {
        path:"sign-up",
        element:<Signup/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"logout",
        element:<Logout/>
      }
    ]
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: fetchBook
      }
    ]
  }
 
]);

export default router;
