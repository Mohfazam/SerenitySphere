import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import { Team } from './components/Landing/Team';
import { Pricing } from './components/Landing/Pricing';
import { HowItWorks } from "./components/Landing/HowItWorks";
import {Hero} from "./components/Landing/Hero";
import {Statistics} from "./components/Landing/Statistics";

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