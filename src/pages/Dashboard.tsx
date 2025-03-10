import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Brain, 
  Target, 
  TrendingUp, 
  Award,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useStore } from '../store';
import { getRandomMotivationalMessage } from '../lib/utils';

function Dashboard() {
  const { user, stats, achievements, tests } = useStore();
  const latestTest = tests.length > 0 ? tests[tests.length - 1] : null;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Trophy className="w-12 h-12 text-primary-500" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-gray-600">{getRandomMotivationalMessage()}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <Brain className="w-8 h-8 text-physics" />
            <span className="text-3xl font-bold">{stats.totalTests}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">Tests Completed</h3>
          <p className="text-sm text-gray-600">Keep up the great work!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <Target className="w-8 h-8 text-chemistry" />
            <span className="text-3xl font-bold">{stats.averageScore.toFixed(1)}%</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">Average Score</h3>
          <p className="text-sm text-gray-600">Consistently improving!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <TrendingUp className="w-8 h-8 text-mathematics" />
            <span className="text-3xl font-bold">{stats.currentStreak}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">Day Streak</h3>
          <p className="text-sm text-gray-600">Best: {stats.bestStreak} days</p>
        </motion.div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {latestTest ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{latestTest.title}</h3>
                  <p className="text-sm text-gray-600">
                    Score: {latestTest.score}%
                  </p>
                </div>
                <Link
                  to={`/analysis/${latestTest.id}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No tests taken yet. Start your journey!</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/generate"
              className="flex items-center justify-between p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Start New Test</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary-600" />
            </Link>
            <Link
              to="/history"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-gray-600" />
                <span className="font-medium">View History</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;