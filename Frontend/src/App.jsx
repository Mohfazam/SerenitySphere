import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import {MoodTracker} from './components/Tracker/MoodTracker';
import {Journaling} from './components/Journaling/Journaling'
import { Team } from "./components/Landing/Team"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/tracker",
    element: <MoodTracker />,
  },
  {
    path: "/journaling",
    element: <Journaling />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;