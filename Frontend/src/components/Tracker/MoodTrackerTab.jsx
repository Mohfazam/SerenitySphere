"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Smile,
  Meh,
  Frown,
  Angry,
  Zap,
  HeartPulse,
  Bed,
  Droplet,
  Target,
  Cloud,
  Coffee,
  Book,
  Music,
  Utensils,
  Activity,
  PlusCircle,
  X,
} from "lucide-react";

const moodEmojis = [
  { emoji: <Smile size={32} />, label: "Happy", color: "bg-emerald-500", textColor: "text-emerald-500" },
  { emoji: <Meh size={32} />, label: "Neutral", color: "bg-amber-500", textColor: "text-amber-500" },
  { emoji: <Frown size={32} />, label: "Sad", color: "bg-blue-500", textColor: "text-blue-500" },
  { emoji: <Angry size={32} />, label: "Angry", color: "bg-rose-500", textColor: "text-rose-500" },
  { emoji: <Zap size={32} />, label: "Energetic", color: "bg-violet-500", textColor: "text-violet-500" },
];

const activities = [
  { icon: <HeartPulse size={20} />, label: "Exercise" },
  { icon: <Bed size={20} />, label: "Rest" },
  { icon: <Droplet size={20} />, label: "Hydrate" },
  { icon: <Target size={20} />, label: "Meditate" },
  { icon: <Cloud size={20} />, label: "Relax" },
  { icon: <Coffee size={20} />, label: "Socialize" },
  { icon: <Book size={20} />, label: "Read" },
  { icon: <Music size={20} />, label: "Listen to Music" },
  { icon: <Utensils size={20} />, label: "Cook" },
  { icon: <Activity size={20} />, label: "Work" },
];

const MoodTrackerTab = ({ addMoodEntry, darkMode }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [sleepHours, setSleepHours] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("");
  const [gratitudeList, setGratitudeList] = useState([""]);
  const [goals, setGoals] = useState([""]);
  const [weather, setWeather] = useState("");

  const logMood = () => {
    if (!currentMood) return;

    const newEntry = {
      date: new Date().toISOString(),
      mood: currentMood,
      notes,
      activities: selectedActivities,
      sleepHours: Number.parseFloat(sleepHours),
      waterIntake: Number.parseFloat(waterIntake),
      exerciseMinutes: Number.parseInt(exerciseMinutes),
      gratitudeList,
      goals,
      weather,
    };

    addMoodEntry(newEntry);
    resetForm();

    // Display toast based on mood
    switch (currentMood.label) {
      case "Happy":
        toast.success(
          <div className="flex items-center">
            <Smile size={24} className="mr-2" />
            <span>Great to see you're happy! Keep smiling! 😊</span>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "!bg-emerald-900 !text-emerald-100",
            bodyClassName: "font-semibold",
          }
        );
        break;
      case "Neutral":
        toast.info(
          <div className="flex items-center">
            <Meh size={24} className="mr-2" />
            <span>Feeling neutral? Take a moment to reflect. 🧘‍♂️</span>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "!bg-amber-900 !text-amber-100",
            bodyClassName: "font-semibold",
          }
        );
        break;
      case "Sad":
        toast.warn(
          <div className="flex items-center">
            <Frown size={24} className="mr-2" />
            <span>It's okay to feel sad. Remember, this too shall pass. 🌧️</span>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "!bg-blue-900 !text-blue-100",
            bodyClassName: "font-semibold",
          }
        );
        break;
      case "Angry":
        toast.error(
          <div className="flex items-center">
            <Angry size={24} className="mr-2" />
            <span>Feeling angry? Take a deep breath and relax. 🧘‍♀️</span>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "!bg-rose-900 !text-rose-100",
            bodyClassName: "font-semibold",
          }
        );
        break;
      case "Energetic":
        toast.success(
          <div className="flex items-center">
            <Zap size={24} className="mr-2" />
            <span>Feeling energetic? Channel that energy into something great! 💪</span>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "!bg-violet-900 !text-violet-100",
            bodyClassName: "font-semibold",
          }
        );
        break;
      default:
        toast("Mood logged successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "!bg-gray-900 !text-gray-100",
          bodyClassName: "font-semibold",
        });
    }
  };

  const resetForm = () => {
    setCurrentMood(null);
    setNotes("");
    setSelectedActivities([]);
    setSleepHours("");
    setWaterIntake("");
    setExerciseMinutes("");
    setGratitudeList([""]);
    setGoals([""]);
    setWeather("");
  };

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity],
    );
  };

  const addListItem = (setter, list) => {
    setter([...list, ""]);
  };

  const updateListItem = (setter, list, index, value) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const removeListItem = (setter, list, index) => {
    const newList = list.filter((_, i) => i !== index);
    setter(newList);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="!bg-gray-900 !text-gray-100 rounded-lg shadow-lg"
        bodyClassName="p-4"
      />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {moodEmojis.map((mood, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentMood(mood)}
              className={`p-4 rounded-lg shadow-sm transition-colors ${currentMood === mood ? "ring-2 ring-blue-500" : ""} ${mood.color}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-white">{mood.emoji}</div>
              <div className="text-white text-xs mt-2">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              placeholder="How are you feeling today?"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activities</label>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, index) => (
                <motion.button
                  key={index}
                  onClick={() => toggleActivity(activity.label)}
                  className={`px-3 py-1 rounded-full flex items-center space-x-1 ${
                    selectedActivities.includes(activity.label)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activity.icon}
                  <span>{activity.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sleep (hours)</label>
              <input
                type="number"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Hours of sleep"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Water (liters)</label>
              <input
                type="number"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Water intake"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Exercise (minutes)
              </label>
              <input
                type="number"
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Exercise duration"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gratitude</label>
            {gratitudeList.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateListItem(setGratitudeList, gratitudeList, index, e.target.value)}
                  className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="I'm grateful for..."
                />
                <button
                  onClick={() => removeListItem(setGratitudeList, gratitudeList, index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addListItem(setGratitudeList, gratitudeList)}
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
            >
              <PlusCircle size={20} className="mr-1" /> Add gratitude item
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goals</label>
            {goals.map((goal, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => updateListItem(setGoals, goals, index, e.target.value)}
                  className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="My goal is..."
                />
                <button
                  onClick={() => removeListItem(setGoals, goals, index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addListItem(setGoals, goals)}
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
            >
              <PlusCircle size={20} className="mr-1" /> Add goal
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weather</label>
            <input
              type="text"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="How's the weather today?"
            />
          </div>

          <motion.button
            onClick={logMood}
            disabled={!currentMood}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold shadow-md transition-colors ${
              !currentMood ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            whileHover={currentMood ? { scale: 1.05 } : {}}
            whileTap={currentMood ? { scale: 0.95 } : {}}
          >
            Log Mood
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MoodTrackerTab;