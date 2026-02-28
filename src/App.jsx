import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Details from "./pages/Details";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import DashboardCrudPage from "./pages/DashboardCrudPage";

function App() {

  const router = createBrowserRouter([
    {
      element: <Home/>,
      path:"/"
    },{
      element: <Login/>,
      path:"/login"
    },{
      element: <Details/>,
      path:"/details/:id"
    },{
      element: <Dashboard/>,
      path:"/dashboard"
    },{
      element: <DashboardCrudPage/>,
      path:"/dashboard-crud"
    },{
      element: <PageNotFound/>,
      path:"*"
    }
  ])

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out' });
  }, []);

  return <RouterProvider router={router} />;


}

export default App