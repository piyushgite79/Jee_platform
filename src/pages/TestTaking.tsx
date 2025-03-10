import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../store';

function TestTaking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = useStore((state) => 
    state.tests.find((t) => t.id === id)
  );
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    Array(test?.totalQuestions || 0).fill(undefined)
  );
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(
    Array(test?.totalQuestions || 0).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(test?.duration ? test.duration * 60 : 0);
  
  useEffect(() => {
    if (!test) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [test, navigate]);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const toggleMarkForReview = (questionIndex: number) => {
    setMarkedForReview((prev) => {
      const newMarked = [...prev];
      newMarked[questionIndex] = !newMarked[questionIndex];
      return newMarked;
    });
  };

  const handleSubmit = () => {
    if (!test) return;
    
    // Calculate score (mock calculation)
    const score = Math.floor(
      (answers.filter((a) => a !== undefined).length / test.totalQuestions) * 100
    );
    
    // Update test with score
    useStore.setState((state) => ({
      tests: state.tests.map((t) =>
        t.id === test.id
          ? { ...t, score, completedAt: new Date() }
          : t
      ),
    }));

    navigate(`/analysis/${test.id}`);
  };

  if (!test) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{test.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Question Navigation */}
        <div className="bg-white rounded-lg p-4 shadow-lg h-fit">
          <h2 className="font-semibold mb-4">Questions</h2>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: test.totalQuestions }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium
                  ${
                    currentQuestion === index
                      ? 'bg-primary-600 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : markedForReview[index]
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Question Content */}
        <div className="md:col-span-3 bg-white rounded-lg p-6 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Question {currentQuestion + 1}
                </h2>
                <button
                  onClick={() => toggleMarkForReview(currentQuestion)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg
                    ${
                      markedForReview[currentQuestion]
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  <Flag className="w-4 h-4" />
                  <span>Mark for Review</span>
                </button>
              </div>

              {/* Mock Question Content */}
              <p className="text-gray-800">
                Sample question text for question {currentQuestion + 1}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((option, index) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(currentQuestion, index)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors
                      ${
                        answers[currentQuestion] === index
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <span className="font-medium">{option}.</span> Option {option}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-gray-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(test.totalQuestions - 1, prev + 1)
                    )
                  }
                  disabled={currentQuestion === test.totalQuestions - 1}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-gray-100"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TestTaking;