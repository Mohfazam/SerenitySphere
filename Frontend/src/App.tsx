import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import { MoodTracker } from './components/Tracker/MoodTracker';
import { Journaling } from './components/Journaling/Journaling';
import MentalHealthTest from './components/DNA/MentalHealthTest';
import { SignUp } from "./components/Auth/Signup";
import { Signin } from "./components/Auth/Signin";
import EduHub from "./components/EduHub/EduHub";
import { ChatBot } from "./components/ChatBot/ChatBot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Tracker",
    element: <MoodTracker />,
  },
  {
    path: "/Journaling",
    element: <Journaling />,
  },
  {
    path: "/DNA",
    element: <MentalHealthTest />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
  {
    path: "/edu",
    element: <EduHub />,
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;