import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  BarChart2,
  ChevronRight,
  Atom,
  Beaker,
  Calculator
} from 'lucide-react';
import { useStore } from '../store';
import { formatDate } from '../lib/utils';

const subjectIcons = {
  physics: Atom,
  chemistry: Beaker,
  mathematics: Calculator,
};

const subjectColors = {
  physics: 'text-physics bg-physics/10',
  chemistry: 'text-chemistry bg-chemistry/10',
  mathematics: 'text-mathematics bg-mathematics/10',
};

function TestHistory() {
  const tests = useStore((state) => state.tests);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6">Test History</h1>

        <div className="space-y-4">
          {tests.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No tests taken yet. Start your journey by taking a test!
            </p>
          ) : (
            tests
              .slice()
              .reverse()
              .map((test) => {
                const Icon = subjectIcons[test.subject];
                const colorClass = subjectColors[test.subject];

                return (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gray-50 rounded-lg p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="font-semibold">{test.title}</h2>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(new Date(test.createdAt))}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{test.duration} minutes</span>
                            </div>
                            {test.score !== undefined && (
                              <div className="flex items-center space-x-1">
                                <BarChart2 className="w-4 h-4" />
                                <span>{test.score}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/analysis/${test.id}`}
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                      >
                        <span>View Analysis</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default TestHistory;