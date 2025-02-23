// modules.jsx
export const modules = {
    "stress-management": {
      title: "Stress Management",
      icon: "⚡",
      color: "bg-purple-100 dark:bg-purple-900",
      lessons: [
        {
          id: "stress-1",
          type: "interactive",
          title: "Understanding Stress Response",
          content: {
            text: "When stressed, your amygdala triggers cortisol release...",
            interactive: {
              type: "branching-scenario",
              options: [
                {
                  label: "Work Deadline",
                  outcome: "Increased heart rate and focus",
                  next: "stress-2a"
                },
                {
                  label: "Family Conflict",
                  outcome: "Emotional tension and anxiety",
                  next: "stress-2b"
                }
              ]
            }
          }
        },
      ]
    },
  };
  
  export const learningPath = [
    {
      title: "Foundations",
      modules: ["stress-management", "anxiety-basics"]
    },
    {
      title: "Advanced Techniques",
      modules: ["cognitive-restructuring", "mindfulness-mastery"]
    }
  ];