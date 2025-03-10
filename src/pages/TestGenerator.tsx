






import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Beaker, Calculator, Atom, Star, Clock } from "lucide-react";
import { useStore } from "../store";

// Subject and Chapter Data
const subjects = [
  { id: "physics", name: "Physics", icon: Atom, color: "text-physics" },
  { id: "chemistry", name: "Chemistry", icon: Beaker, color: "text-chemistry" },
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "text-mathematics" },
];

const chapters = {
  physics: ["Kinematics", "Laws of Motion", "Work, Energy & Power", "Rotational Motion"],
  chemistry: ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Equilibrium"],
  mathematics: ["Algebra", "Trigonometry", "Coordinate Geometry", "Calculus"],
};

const difficulties = [
  { level: 1, label: "Easy" },
  { level: 2, label: "Medium" },
  { level: 3, label: "Hard" },
];

const durations = [30, 60, 90, 120]; // Duration options in minutes

function TestGenerator() {
  const navigate = useNavigate();
  const addTest = useStore((state) => state.addTest);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [difficulty, setDifficulty] = useState(1);
  const [questionCount, setQuestionCount] = useState(30);
  const [duration, setDuration] = useState(60); // Default duration is 60 minutes
  const [loading, setLoading] = useState(false);

  // Handle Chapter Selection
  const handleChapterSelection = (chapter) => {
    setSelectedChapters((prev) =>
      prev.includes(chapter) ? prev.filter((c) => c !== chapter) : [...prev, chapter]
    );
  };

  // Handle AI-based Question Generation
  const handleGenerateTest = async () => {
    if (!selectedSubject || selectedChapters.length === 0) {
      alert("Please select a subject and at least one chapter.");
      return;
    }

    setLoading(true);

    const prompt = `Generate ${questionCount} ${
      difficulty === 1 ? "easy" : difficulty === 2 ? "medium" : "hard"
    } level multiple-choice questions for ${selectedSubject} chapters: ${selectedChapters.join(", ")}. 
    Format each question as: "Question: ... Options: a) ... b) ... c) ... d) ... Answer: ..."`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const generatedQuestions = data?.candidates?.[0]?.content ?? "No questions generated.";

      const newTest = {
        id: crypto.randomUUID(),
        title: `${selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} Test`,
        subject: selectedSubject,
        chapters: selectedChapters,
        difficulty,
        totalQuestions: questionCount,
        duration, // Include the selected duration
        questions: generatedQuestions,
        createdAt: new Date(),
      };

      addTest(newTest);
      navigate(`/test/${newTest.id}`);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Generate New Test</h1>

        {/* Subject Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Subject</h2>
          <div className="grid grid-cols-3 gap-4">
            {subjects.map(({ id, name, icon: Icon, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSubject(id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedSubject === id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                <span className="block text-center font-medium">{name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chapter Selection */}
        {selectedSubject && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Select Chapters</h2>
            <div className="grid grid-cols-2 gap-2">
              {chapters[selectedSubject].map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => handleChapterSelection(chapter)}
                  className={`p-2 border rounded-lg ${selectedChapters.includes(chapter) ? "bg-primary-500 text-white" : "bg-gray-200"}`}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Difficulty</h2>
          <div className="flex space-x-4">
            {difficulties.map(({ level, label }) => (
              <button key={level} onClick={() => setDifficulty(level)} className={`flex-1 p-4 rounded-lg border-2 ${difficulty === level ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: level }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${difficulty === level ? "text-primary-500" : "text-gray-400"}`} fill={difficulty === level ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="block text-center font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Duration Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Duration (minutes)</h2>
          <div className="flex space-x-4">
            {durations.map((time) => (
              <button key={time} onClick={() => setDuration(time)} className={`flex-1 p-4 rounded-lg border-2 ${duration === time ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <span className="block text-center font-medium">{time} min</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleGenerateTest} disabled={!selectedSubject} className="w-full py-4 px-6 bg-primary-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors">
          {loading ? "Generating..." : "Generate Test"}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default TestGenerator;
