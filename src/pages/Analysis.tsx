import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ChevronLeft
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useStore } from '../store';
import { formatDate } from '../lib/utils';

function Analysis() {
  const { id } = useParams();
  const test = useStore((state) => 
    state.tests.find((t) => t.id === id)
  );
  const tests = useStore((state) => state.tests);

  if (!test) return null;

  // Mock data for charts
  const subjectData = [
    { name: 'Mechanics', correct: 8, total: 10 },
    { name: 'Thermodynamics', correct: 6, total: 8 },
    { name: 'Optics', correct: 7, total: 9 },
  ];

  const progressData = tests
    .filter((t) => t.subject === test.subject && t.score !== undefined)
    .map((t) => ({
      date: formatDate(new Date(t.createdAt)),
      score: t.score,
    }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/history"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to History</span>
          </Link>
          <span className="text-sm text-gray-600">
            {formatDate(new Date(test.createdAt))}
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-6">{test.title} Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <BarChart2 className="w-6 h-6 text-primary-600" />
              <span className="text-2xl font-bold">{test.score}%</span>
            </div>
            <h3 className="mt-2 font-semibold">Overall Score</h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Clock className="w-6 h-6 text-primary-600" />
              <span className="text-2xl font-bold">{test.duration} min</span>
            </div>
            <h3 className="mt-2 font-semibold">Time Taken</h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Target className="w-6 h-6 text-primary-600" />
              <span className="text-2xl font-bold">{test.totalQuestions}</span>
            </div>
            <h3 className="mt-2 font-semibold">Total Questions</h3>
          </div>
        </div>
      </motion.div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-6">Topic-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="correct" fill="#0ea5e9" name="Correct" />
              <Bar dataKey="total" fill="#e0f2fe" name="Total Questions" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-6">Progress Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Question Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-6">Question Analysis</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border-l-4 border-primary-500 bg-gray-50 p-4 rounded-r-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Question {index + 1}</h3>
                {index % 2 === 0 ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Correct</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Incorrect</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-2">
                Sample question text for analysis...
              </p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm font-medium">Explanation:</p>
                <p className="text-sm text-gray-600">
                  Detailed explanation of the correct answer and solution approach...
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold">Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Strong Areas</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Mechanics concepts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Problem-solving speed</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Areas for Improvement</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Thermodynamics formulas</span>
              </li>
              <li className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Time management</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Analysis;