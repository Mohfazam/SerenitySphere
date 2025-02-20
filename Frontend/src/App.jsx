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
import MentalHealthDNA from './components/DNA/MentalHealthDNA'

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
    path: "/Journaling",
    element: <Journaling />,
  },
  {
    path: "/MentalHealthDNA",
    element: <MentalHealthDNA />,
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;