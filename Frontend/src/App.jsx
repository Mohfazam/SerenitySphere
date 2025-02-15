import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { Landing } from "./components/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;