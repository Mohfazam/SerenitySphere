"use client"

import { useState, useEffect, useMemo, useReducer } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { DollarSign ,Leaf , LifeBuoy , Brain,Palette, Smile , Sun, MessageSquare , Asterisk, AlertOctagon , Bug ,BrainCircuit ,Shield,Repeat , Clock , Apple ,Zap , AlertTriangle , Heart , Users , Smartphone , HeartPulse , Moon, Trophy,CloudRain, BookOpen, X, ChevronRight, Search, CheckCircle, Activity } from "lucide-react"
import {Navbar} from '../Navbar';

const modules = [
  {
    id: 1,
    title: "Understanding Anxiety",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    lesson: `Anxiety is a natural response to stress, characterized by feelings of tension, worried thoughts, and physical changes like increased blood pressure. It becomes problematic when persistent and disproportionate to actual threats.`,
    quiz: [{
      question: "What hormone is primarily released during anxiety responses?",
      options: ["Dopamine", "Cortisol", "Estrogen", "Insulin"],
      correct: 1,
      explanation: "Cortisol is the primary stress hormone released during anxiety"
    }]
  },
  {
    id: 2,
    title: "Depression Awareness",
    icon: CloudRain,
    color: "from-blue-500 to-cyan-500",
    lesson: `Depression is more than sadness - it's a persistent mood disorder affecting daily functioning. Symptoms include loss of interest, changes in sleep/appetite, and feelings of worthlessness. Biological, psychological and social factors all contribute.`,
    quiz: [{
      question: "Which neurotransmitter is most associated with depression?",
      options: ["Acetylcholine", "Serotonin", "Adrenaline", "GABA"],
      correct: 1,
      explanation: "Serotonin imbalance is strongly linked to depressive symptoms"
    }]
  },
  {
    id: 3,
    title: "Mindful Breathing",
    icon: Activity,
    color: "from-teal-500 to-emerald-500",
    lesson: `Diaphragmatic breathing activates the parasympathetic nervous system, reducing stress hormones. Practice 4-7-8 technique: inhale 4s, hold 7s, exhale 8s. Regular practice lowers blood pressure and improves emotional regulation.`,
    quiz: [{
      question: "What system does deep breathing activate?",
      options: ["Sympathetic", "Parasympathetic", "Central", "Digestive"],
      correct: 1,
      explanation: "Parasympathetic nervous system promotes relaxation"
    }]
  },
  {
    id: 4,
    title: "Sleep Hygiene",
    icon: Moon,
    color: "from-indigo-500 to-violet-500",
    lesson: `Quality sleep requires consistent routines and environment optimization. Keep bedroom 60-67°F, limit screen time 1hr before bed, and avoid caffeine after 2PM. Blue light filters and white noise machines can improve sleep architecture.`,
    quiz: [{
      question: "Ideal bedroom temperature for sleep?",
      options: ["50-55°F", "60-67°F", "70-75°F", "No impact"],
      correct: 1,
      explanation: "Cool environments support melatonin production"
    }]
  },
  {
    id: 5,
    title: "Emotional First Aid",
    icon: HeartPulse,
    color: "from-rose-500 to-pink-500",
    lesson: `Immediate crisis management techniques include 5-4-3-2-1 grounding: Name 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste. TIPP method (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation) can prevent escalation.`,
    quiz: [{
      question: "What does TIPP stand for?",
      options: ["Time, Ice, Push, Pause", "Temperature, Intense exercise, Paced breathing, Paired relaxation", "Talk, Inhale, Ponder, Pray", "Tense, Inhale, Pucker, Push"],
      correct: 1,
      explanation: "TIPP is Temperature change, Intense exercise, Paced breathing, Paired muscle relaxation"
    }]
  },
  {
    id: 6,
    title: "Cognitive Distortions",
    icon: Brain,
    color: "from-orange-500 to-amber-500",
    lesson: `Common thinking traps include catastrophizing (worst-case scenarios), black-and-white thinking (all-or-nothing), and mind reading (assuming others' thoughts). Challenge these by examining evidence and considering alternative perspectives.`,
    quiz: [{
      question: "Which distortion involves predicting disaster?",
      options: ["Mind Reading", "Catastrophizing", "Labeling", "Discounting Positives"],
      correct: 1,
      explanation: "Catastrophizing is anticipating worst outcomes without evidence"
    }]
  },
  {
    id: 7,
    title: "Nutrition & Mood",
    icon: Apple,
    color: "from-lime-500 to-green-500",
    lesson: `Gut-brain axis: 95% of serotonin is produced in intestines. Omega-3s (fatty fish), probiotics (yogurt), and magnesium (leafy greens) support mental health. Limit processed sugars that cause energy crashes and inflammation.`,
    quiz: [{
      question: "Which nutrient boosts serotonin production?",
      options: ["Vitamin C", "Omega-3", "Calcium", "Iron"],
      correct: 1,
      explanation: "Omega-3 fatty acids support neurotransmitter function"
    }]
  },
  {
    id: 8,
    title: "Digital Detox",
    icon: Smartphone,
    color: "from-gray-500 to-slate-500",
    lesson: `Constant connectivity increases anxiety and reduces attention span. Implement 20-20-20 rule: Every 20 minutes, look 20 feet away for 20 seconds. Designate tech-free zones and use app limiters to regain focus.`,
    quiz: [{
      question: "What's the 20-20-20 rule for?",
      options: ["Social media use", "Eye strain prevention", "Walking breaks", "Hydration"],
      correct: 1,
      explanation: "Prevents digital eye strain and mental fatigue"
    }]
  },
  {
    id: 9,
    title: "Social Connection",
    icon: Users,
    color: "from-sky-500 to-blue-500",
    lesson: `Loneliness increases cortisol by 20%. Quality relationships boost oxytocin. Join clubs with shared interests, practice active listening, and schedule regular check-ins. Balance social time with solitude needs.`,
    quiz: [{
      question: "Loneliness increases which stress hormone?",
      options: ["Oxytocin", "Cortisol", "Dopamine", "Estrogen"],
      correct: 1,
      explanation: "Cortisol levels rise with perceived social isolation"
    }]
  },
  {
    id: 10,
    title: "Grief Processing",
    icon: CloudRain,
    color: "from-violet-500 to-purple-500",
    lesson: `Grief has no timeline - it's nonlinear with waves of emotion. Create rituals (memory jars, anniversary acknowledgments). Complicated grief lasting >12 months may require professional support.`,
    quiz: [{
      question: "True about grief:",
      options: ["Linear process", "Fixed timeline", "Nonlinear waves", "Always resolves alone"],
      correct: 2,
      explanation: "Grief comes in unpredictable waves, not stages"
    }]
  },
  {
    id: 11,
    title: "Anger Management",
    icon: Zap,
    color: "from-red-500 to-orange-500",
    lesson: `Anger is a secondary emotion often masking hurt/fear. Use STOP technique: Stop, Take breath, Observe, Proceed. Channel energy through exercise or creative outlets. Identify triggers through mood tracking.`,
    quiz: [{
      question: "What does STOP stand for?",
      options: ["Shout, Think, Observe, Pause", "Stop, Take breath, Observe, Proceed", "Stand, Talk, Open, Push", "Start, Time, Organize, Plan"],
      correct: 1,
      explanation: "STOP = Pause, breathe, assess, then act mindfully"
    }]
  },
  {
    id: 12,
    title: "Self-Compassion",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    lesson: `Treat yourself with same kindness as a friend. Three elements: mindfulness (non-judgment), common humanity (others struggle too), and self-kindness. Reduces perfectionism and shame cycles.`,
    quiz: [{
      question: "Key self-compassion component:",
      options: ["Self-criticism", "Common humanity", "Isolation", "Perfectionism"],
      correct: 1,
      explanation: "Recognizing shared human experience reduces shame"
    }]
  },
  {
    id: 13,
    title: "PTSD Basics",
    icon: AlertTriangle,
    color: "from-amber-500 to-yellow-500",
    lesson: `Post-Traumatic Stress Disorder develops after exposure to traumatic events. Symptoms include flashbacks, hypervigilance, and avoidance. EMDR therapy and grounding techniques help process memories safely.`,
    quiz: [{
      question: "Common PTSD symptom:",
      options: ["Hyperactivity", "Hypervigilance", "Hypersomnia", "Hypertension"],
      correct: 1,
      explanation: "Hypervigilance is constant scanning for danger"
    }]
  },
  {
    id: 14,
    title: "OCD Patterns",
    icon: Repeat,
    color: "from-cyan-500 to-sky-500",
    lesson: `Obsessive-Compulsive Disorder involves intrusive thoughts (obsessions) and ritualistic behaviors (compulsions). Exposure Response Prevention (ERP) therapy gradually reduces ritual engagement while managing anxiety.`,
    quiz: [{
      question: "Gold standard OCD treatment:",
      options: ["Medication only", "ERP therapy", "Hypnosis", "Surgery"],
      correct: 1,
      explanation: "Exposure Response Prevention is most effective"
    }]
  },
  {
    id: 15,
    title: "ADHD Strategies",
    icon: Clock,
    color: "from-fuchsia-500 to-pink-500",
    lesson: `Time blindness management: Use visual timers and body doubling. Break tasks into "tiny habits" (2-min rule). Leverage hyperfocus with interest pairing. Movement boosts dopamine - try treadmill desks or fidget tools.`,
    quiz: [{
      question: "Helpful for ADHD time management:",
      options: ["Analog clocks", "Visual timers", "No deadlines", "Multitasking"],
      correct: 1,
      explanation: "Visual timers make time progression concrete"
    }]
  },
  {
    id: 16,
    title: "Boundaries Setting",
    icon: Shield,
    color: "from-emerald-500 to-green-500",
    lesson: `Healthy boundaries protect emotional energy. Types: Physical (personal space), Emotional (managing oversharing), Time (saying no). Use "I-statements": "I feel overwhelmed when..." rather than accusatory language.`,
    quiz: [{
      question: "Best way to set boundaries?",
      options: ["Avoidance", "Aggressive demands", "I-statements", "Silent treatment"],
      correct: 2,
      explanation: "I-statements communicate needs respectfully"
    }]
  },
  {
    id: 17,
    title: "Art Therapy Basics",
    icon: Palette,
    color: "from-violet-500 to-purple-500",
    lesson: `Non-verbal expression through drawing/painting accesses subconscious emotions. Mandala coloring reduces anxiety by 37%. No artistic skill needed - focus on process, not product. Use abstract shapes to represent feelings.`,
    quiz: [{
      question: "Primary benefit of art therapy?",
      options: ["Skill development", "Emotional expression", "Social approval", "Memory improvement"],
      correct: 1,
      explanation: "Channel emotions through creative mediums"
    }]
  },
  {
    id: 18,
    title: "Journaling Benefits",
    icon: BookOpen,
    color: "from-amber-500 to-orange-500",
    lesson: `Writing 20 mins/day lowers stress hormones. Methods: Gratitude journaling, Stream-of-consciousness, Bullet journals. Prompts: "Today I overcame...", "What needs release...", "I'm proud of...".`,
    quiz: [{
      question: "Optimal daily journal duration?",
      options: ["5 mins", "20 mins", "60 mins", "No minimum"],
      correct: 1,
      explanation: "20 minutes shown to significantly reduce cortisol"
    }]
  },
  {
    id: 19,
    title: "Phobia Management",
    icon: Bug,
    color: "from-lime-500 to-emerald-500",
    lesson: `Systematic desensitization: Gradually expose to fear trigger while practicing relaxation. Spider phobia? Start with pictures → videos → real spiders at distance. Pair with deep breathing.`,
    quiz: [{
      question: "Effective phobia treatment?",
      options: ["Avoidance", "Flooding", "Systematic desensitization", "Hypnosis"],
      correct: 2,
      explanation: "Gradual exposure paired with relaxation techniques"
    }]
  },
  {
    id: 20,
    title: "Mindfulness Meditation",
    icon: Zap,
    color: "from-sky-500 to-blue-500",
    lesson: `Focus on present moment without judgment. Beginner technique: Label thoughts "planning", "remembering", then return to breath. Start with 5-min sessions using apps like Insight Timer.`,
    quiz: [{
      question: "Mindfulness core practice?",
      options: ["Future planning", "Present focus", "Past analysis", "Multitasking"],
      correct: 1,
      explanation: "Non-judgmental awareness of current experience"
    }]
  },
  {
    id: 21,
    title: "CBT Fundamentals",
    icon: BrainCircuit,
    color: "from-rose-500 to-pink-500",
    lesson: `Cognitive Behavioral Therapy links thoughts → feelings → behaviors. Challenge negative thoughts with evidence: "What proof supports this thought? What contradicts it?"`,
    quiz: [{
      question: "CBT focuses on changing:",
      options: ["Genetics", "Thought patterns", "Medication", "Past trauma"],
      correct: 1,
      explanation: "Identifies and restructures unhelpful thinking"
    }]
  },
  {
    id: 22,
    title: "DBT Skills",
    icon: Asterisk ,
    color: "from-indigo-500 to-blue-500",
    lesson: `Dialectical Behavior Therapy skills: DISTRACT (Activities, Contributing, Comparisons, Emotions), IMPROVE (Imagery, Meaning, Prayer, Relaxation), PLEASE (PhysicaL health, Eating, Avoid drugs, Sleep, Exercise)`,
    quiz: [{
      question: "DBT's PLEASE skill focuses on:",
      options: ["Social skills", "Physical health", "Career growth", "Spirituality"],
      correct: 1,
      explanation: "Maintains physical wellness to support mental health"
    }]
  },
  {
    id: 23,
    title: "Addiction Recovery",
    icon: AlertOctagon,
    color: "from-red-500 to-orange-500",
    lesson: `Stages: Precontemplation → Contemplation → Preparation → Action → Maintenance. HALT triggers (Hungry, Angry, Lonely, Tired). Build replacement rituals - chewing gum instead of smoking.`,
    quiz: [{
      question: "HALT stands for:",
      options: ["Halt All Life Troubles", "Hungry Angry Lonely Tired", "Heal Addictive Lifestyle Tendencies", "Happiness Achieved Through Love"],
      correct: 1,
      explanation: "Common relapse triggers to monitor"
    }]
  },
  {
    id: 24,
    title: "Body Positivity",
    icon: Smile,
    color: "from-pink-500 to-rose-500",
    lesson: `Challenge media ideals via body neutrality: "My legs carry me" vs "My legs look good". Mirror work: List 5 non-appearance attributes daily. Follow diverse body influencers.`,
    quiz: [{
      question: "Body neutrality emphasizes:",
      options: ["Appearance focus", "Function over form", "Comparison", "Dieting"],
      correct: 1,
      explanation: "Appreciating body capabilities vs aesthetics"
    }]
  },
  {
    id: 25,
    title: "Trauma-Informed Care",
    icon: HeartPulse,
    color: "from-teal-500 to-cyan-500",
    lesson: `Key principles: Safety, Trustworthiness, Choice, Collaboration, Empowerment. Avoid retraumatization by asking "What happened to you?" not "What's wrong with you?"`,
    quiz: [{
      question: "Trauma-informed approach focuses on:",
      options: ["Diagnosis", "Personal history", "Safety & empowerment", "Medication"],
      correct: 2,
      explanation: "Creates safe environments for healing"
    }]
  },
  {
    id: 26,
    title: "Positive Psychology",
    icon: Sun,
    color: "from-yellow-500 to-amber-500",
    lesson: `Cultivate PERMA: Positive Emotion, Engagement, Relationships, Meaning, Accomplishment. Practice 3 Good Things - daily list of positive experiences. Signature strengths assessment via VIA Survey.`,
    quiz: [{
      question: "PERMA includes:",
      options: ["Punishment", "Engagement", "Rejection", "Apathy"],
      correct: 1,
      explanation: "Engagement refers to flow states"
    }]
  },
  {
    id: 27,
    title: "Communication Skills",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
    lesson: `DEAR MAN technique: Describe, Express, Assert, Reinforce (stay Mindful, Appear confident, Negotiate). Active listening: Paraphrase ("So you feel...") + Validate ("That makes sense because...")`,
    quiz: [{
      question: "DEAR MAN is used for:",
      options: ["Assertiveness", "Memory", "Exercise", "Sleep"],
      correct: 0,
      explanation: "Assertive communication framework"
    }]
  },
  {
    id: 28,
    title: "Financial Stress",
    icon: DollarSign,
    color: "from-green-500 to-lime-500",
    lesson: `50/30/20 rule: Needs(50%), Wants(30%), Savings(20%). Automate bill payments. Negotiate payment plans. Use apps like Mint for tracking. Separate emotional spending from necessities.`,
    quiz: [{
      question: "50/30/20 budget allocates 30% to:",
      options: ["Needs", "Wants", "Savings", "Debt"],
      correct: 1,
      explanation: "30% discretionary spending"
    }]
  },
  {
    id: 29,
    title: "Nature Therapy",
    icon: Leaf,
    color: "from-emerald-500 to-teal-500",
    lesson: `Shinrin-yoku (forest bathing) reduces cortisol by 16%. 120 mins/week in nature boosts wellbeing. Barefoot grounding decreases inflammation. Create indoor green spaces with plants.`,
    quiz: [{
      question: "Recommended weekly nature exposure:",
      options: ["30 mins", "120 mins", "300 mins", "No minimum"],
      correct: 1,
      explanation: "2 hours provides measurable benefits"
    }]
  },
  {
    id: 30,
    title: "Crisis Planning",
    icon: LifeBuoy,
    color: "from-red-600 to-orange-600",
    lesson: `Create a safety plan: 1) Warning signs 2) Coping strategies 3) Trusted contacts 4) Professional resources 5) Safe environment. Share with support network and review quarterly.`,
    quiz: [{
      question: "First step in safety planning:",
      options: ["Call therapist", "Identify warning signs", "Medication check", "Avoid triggers"],
      correct: 1,
      explanation: "Recognizing early signs enables proactive response"
    }]
  }
];

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_PROGRESS':
      return { ...state, ...action.payload }
    case 'COMPLETE_MODULE':
      return {
        ...state,
        completed: [...new Set([...state.completed, action.moduleId])],
        score: state.score + action.score
      }
    case 'SET_ACTIVE_MODULE':
      return { ...state, activeModuleId: action.moduleId }
    case 'START_QUIZ':
      return { ...state, quizState: 'active' }
    case 'RESET_MODULE':
      return { ...state, activeModuleId: null, quizState: 'idle' }
    default:
      return state
  }
}

const initialState = {
  completed: [],
  score: 0,
  activeModuleId: null,
  quizState: 'idle'
}

export default function EduHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [confetti, setConfetti] = useState([])
  const [quizAnswers, setQuizAnswers] = useState({})

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mh-progress")) || initialState
    dispatch({ type: 'LOAD_PROGRESS', payload: saved })
  }, [])

  useEffect(() => {
    localStorage.setItem("mh-progress", JSON.stringify(state))
  }, [state])

  const fireConfetti = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotate: Math.random() * 360
    }))
    setConfetti(particles)
    setTimeout(() => setConfetti([]), 3000)
  }

  const currentModule = modules.find(m => m.id === state.activeModuleId)
  const currentQuiz = currentModule?.quiz || []
  const currentProgress = currentQuiz.reduce((acc, _, index) => 
    acc + (quizAnswers[index]?.isCorrect ? 1 : 0), 0)
  const isQuizComplete = Object.keys(quizAnswers).length === currentQuiz.length

  const handleAnswer = (questionIndex, answerIndex) => {
    if (quizAnswers[questionIndex]) return
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: {
        selected: answerIndex,
        isCorrect: answerIndex === currentQuiz[questionIndex].correct
      }
    }))
  }

  const handleQuizComplete = () => {
    if (currentModule && !state.completed.includes(currentModule.id)) {
      const earnedScore = currentProgress * 10
      dispatch({ 
        type: 'COMPLETE_MODULE', 
        moduleId: currentModule.id, 
        score: earnedScore 
      })
      fireConfetti()
    }
    dispatch({ type: 'RESET_MODULE' })
    setQuizAnswers({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar title="EduHub" icon={BookOpen}/>
      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 1, rotate: p.rotate }}
            animate={{ 
              y: "110%", 
              x: `${p.x + (Math.random() * 40 - 20)}%`,
              rotate: p.rotate + 360,
              opacity: 0
            }}
            transition={{ duration: 2, ease: "linear" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.header className="flex items-center justify-between mb-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg shadow-lg"
            >
              <Brain className="text-white w-6 h-6" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MindAcademy
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-purple-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
            <Trophy className="text-amber-500 w-5 h-5" />
            <span className="font-semibold text-purple-600 dark:text-amber-400">
              {state.score} XP
            </span>
          </div>
        </motion.header>

        <div className="relative mb-8 group">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full p-4 pl-12 rounded-xl bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 border-0 text-lg transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
        </div>

        <LayoutGroup>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.filter(m => 
              m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              m.lesson.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((module) => (
              <motion.div
                key={module.id}
                layoutId={module.id.toString()}
                className={`group relative bg-gradient-to-br ${module.color} rounded-2xl shadow-xl cursor-pointer overflow-hidden`}
                whileHover={{ scale: 1.03 }}
                onClick={() => dispatch({ type: 'SET_ACTIVE_MODULE', moduleId: module.id })}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-4">
                      <motion.div 
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 15 }}
                      >
                        <module.icon className="text-white w-6 h-6" />
                      </motion.div>
                      <h2 className="text-xl font-semibold text-white">{module.title}</h2>
                      <p className="text-white/90 line-clamp-3">{module.lesson.substring(0, 150)}...</p>
                    </div>
                    <ChevronRight className="text-white/80 group-hover:text-white transition-colors" />
                  </div>
                  {state.completed.includes(module.id) && (
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        <AnimatePresence>
          {state.activeModuleId && currentModule && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch({ type: 'RESET_MODULE' })}
            >
              <motion.div
                layoutId={currentModule.id.toString()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <h3 className="text-2xl font-bold">{currentModule.title}</h3>
                  <button 
                    onClick={() => dispatch({ type: 'RESET_MODULE' })}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {state.quizState === 'idle' ? (
                    <div className="space-y-6">
                      <article className="prose dark:prose-invert max-w-none">
                        <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                          Lesson Content
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {currentModule.lesson}
                        </p>
                      </article>
                      <button
                        onClick={() => dispatch({ type: 'START_QUIZ' })}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors"
                      >
                        Start Quiz ({currentModule.quiz.length} Questions)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-500">
                          Question {Object.keys(quizAnswers).length + 1}/{currentQuiz.length}
                        </span>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-amber-500" />
                          <span className="font-medium">{currentProgress * 10} XP Earned</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {currentQuiz.map((question, index) => (
                          <div 
                            key={index}
                            className={`p-4 rounded-xl transition-colors ${
                              quizAnswers[index] ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                            }`}
                          >
                            <h4 className="text-lg font-medium mb-4">{question.question}</h4>
                            <div className="grid gap-3">
                              {question.options.map((option, optionIndex) => {
                                const isSelected = quizAnswers[index]?.selected === optionIndex
                                const isCorrect = optionIndex === question.correct
                                return (
                                  <motion.button
                                    key={optionIndex}
                                    className={`p-3 rounded-xl text-left transition-colors ${
                                      isSelected
                                        ? isCorrect
                                          ? 'bg-green-100 dark:bg-green-900'
                                          : 'bg-red-100 dark:bg-red-900'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                    whileHover={{ scale: quizAnswers[index] ? 1 : 1.02 }}
                                    onClick={() => handleAnswer(index, optionIndex)}
                                    disabled={!!quizAnswers[index]}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        isSelected 
                                          ? isCorrect 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-red-500 text-white'
                                          : 'bg-gray-300 dark:bg-gray-600'
                                      }`}>
                                        {String.fromCharCode(65 + optionIndex)}
                                      </div>
                                      <span>{option}</span>
                                    </div>
                                    {quizAnswers[index] && isCorrect && (
                                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                                        {question.explanation}
                                      </p>
                                    )}
                                  </motion.button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {isQuizComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center space-y-4"
                        >
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                          <h4 className="text-2xl font-bold">Quiz Complete!</h4>
                          <p className="text-xl">
                            Score: {currentProgress}/{currentQuiz.length}
                          </p>
                          <button
                            onClick={handleQuizComplete}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors"
                          >
                            {state.completed.includes(currentModule.id)
                              ? "Retake Quiz"
                              : "Complete Module"}
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}