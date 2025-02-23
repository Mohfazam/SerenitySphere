"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  BookOpen,
  CircleCheck,
  Clock,
  Video,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ModuleDetailModal({
  module,
  quizState,
  progress,
  onClose,
  onQuizStart,
  onAnswer,
  fireConfetti,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [activeTab, setActiveTab] = useState("content");
  const [selectedContent, setSelectedContent] = useState(null);
  const currentQuestion = module.quiz[quizState?.questionIndex];
  const isCompleted = progress.completed.includes(module.title);

  useEffect(() => {
    if (quizState.active && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizState.active, timeLeft]);

  const handleAnswerSelection = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    setTimeout(() => {
      onAnswer(index);
      setSelectedAnswer(null);
      setTimeLeft(10);
    }, 1500);
  };

  const ContentModal = ({ content, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{content.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {content.content && (
          <div className="prose dark:prose-invert">
            <p>{content.content}</p>
            {content.duration && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {content.duration}
              </div>
            )}
          </div>
        )}

        {content.steps && (
          <ul className="list-decimal pl-6 space-y-2">
            {content.steps.map((step, index) => (
              <li key={index} className="text-lg">
                {step}
              </li>
            ))}
          </ul>
        )}

        {content.thumbnail && (
          <div className="mt-4 aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
            <img
              src={content.thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        layoutId={`module-${module.title}`}
      >
        <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <h3 className="text-2xl font-bold">{module.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="flex gap-4 border-b dark:border-gray-700">
            {["content", "quiz"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-4 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-purple-500 text-purple-500"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                {tab === "content" ? "Learning Materials" : "Knowledge Check"}
              </button>
            ))}
          </div>

          {activeTab === "content" ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Articles & Guides
                </h4>
                {module.detailedContent.articles.map((article, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    whileHover={{ translateX: 5 }}
                    onClick={() => setSelectedContent(article)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <BookOpen className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h5 className="font-semibold">{article.title}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {article.duration} • {article.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-500" />
                  Video Content
                </h4>
                {module.detailedContent.videos.map((video, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedContent(video)}
                  >
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <button className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Video className="w-8 h-8 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  Interactive Exercises
                </h4>
                {module.detailedContent.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/30 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/50"
                    onClick={() => setSelectedContent(exercise)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Activity className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h5 className="font-semibold">{exercise.title}</h5>
                        <ul className="list-disc pl-6 mt-2 text-sm text-gray-600 dark:text-gray-300">
                          {exercise.steps.map((step, i) => (
                            <li key={i} className="mb-2">
                              {step}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center gap-2 text-sm text-purple-500">
                          <Clock className="w-4 h-4" />
                          {exercise.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {quizState.active ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-purple-500">
                        <span className="font-semibold">
                          Question {quizState.questionIndex + 1}/
                          {module.quiz.length}
                        </span>
                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                ((quizState.questionIndex + 1) /
                                  module.quiz.length) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-amber-500">
                        <Trophy className="w-5 h-5" />
                        <span className="font-medium">
                          {quizState.score} XP
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{timeLeft}s remaining</span>
                    </div>
                  </div>

                  <motion.div
                    key={quizState.questionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h4 className="text-xl font-semibold">
                      {currentQuestion.question}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentQuestion.options.map((option, index) => {
                        const isCorrect = index === currentQuestion.correct;
                        const isSelected = selectedAnswer === index;

                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswerSelection(index)}
                            className={`p-4 rounded-xl text-left transition-all ${
                              selectedAnswer !== null
                                ? isCorrect
                                  ? "bg-green-100 dark:bg-green-900 border-2 border-green-500"
                                  : isSelected
                                  ? "bg-red-100 dark:bg-red-900 border-2 border-red-500"
                                  : "bg-gray-100 dark:bg-gray-700"
                                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                            whileHover={
                              selectedAnswer === null ? { scale: 1.02 } : {}
                            }
                            disabled={selectedAnswer !== null}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  selectedAnswer !== null
                                    ? isCorrect
                                      ? "bg-green-500 text-white"
                                      : isSelected
                                      ? "bg-red-500 text-white"
                                      : "bg-gray-300 dark:bg-gray-600"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  {isCompleted ? (
                    <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-2xl space-y-4">
                      <CircleCheck className="w-16 h-16 text-green-500 mx-auto" />
                      <h4 className="text-2xl font-bold">Module Mastered!</h4>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
                        <div className="text-3xl font-bold text-green-500">
                          +{quizState.score * 10} XP
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                          You've completed all challenges
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-colors"
                      >
                        Continue Learning
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-2xl">
                        <h4 className="text-xl font-semibold mb-4 flex items-center gap-3">
                          <AlertTriangle className="w-6 h-6 text-amber-500" />
                          Knowledge Check
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
                            <div className="text-2xl font-bold text-purple-500">
                              {module.quiz.length}
                            </div>
                            <div className="text-sm text-gray-500">
                              Questions
                            </div>
                          </div>
                          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
                            <div className="text-2xl font-bold text-purple-500">
                              {module.quiz.length * 10}
                            </div>
                            <div className="text-sm text-gray-500">
                              XP Available
                            </div>
                          </div>
                          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
                            <div className="text-2xl font-bold text-purple-500">
                              80%
                            </div>
                            <div className="text-sm text-gray-500">
                              Pass Rate
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={onQuizStart}
                          className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <Activity className="w-5 h-5" />
                          Start Challenge
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedContent && (
          <ContentModal
            content={selectedContent}
            onClose={() => setSelectedContent(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
