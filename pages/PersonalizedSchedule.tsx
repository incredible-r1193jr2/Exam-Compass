import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, Plus, Trash2, Edit2 } from 'lucide-react';

interface ScheduleItem {
  id: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const PersonalizedSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    subject: '',
    topic: '',
    startTime: '',
    endTime: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'medium' as const,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load schedules from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('personalized_schedules');
    if (saved) {
      setSchedules(JSON.parse(saved));
    }
  }, []);

  // Save schedules to localStorage
  useEffect(() => {
    localStorage.setItem('personalized_schedules', JSON.stringify(schedules));
  }, [schedules]);

  const addSchedule = () => {
    if (!newSchedule.subject || !newSchedule.topic || !newSchedule.startTime || !newSchedule.endTime) {
      alert('Please fill in all fields');
      return;
    }

    const schedule: ScheduleItem = {
      id: Date.now().toString(),
      ...newSchedule,
      completed: false,
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      subject: '',
      topic: '',
      startTime: '',
      endTime: '',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium',
    });
  };

  const updateSchedule = (id: string, updates: Partial<ScheduleItem>) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, ...updates } : s));
    setEditingId(null);
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const toggleComplete = (id: string) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, completed: !s.completed } : s
    ));
  };

  const sortedSchedules = [...schedules].sort((a, b) =>
    new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime()
  );

  const upcomingSchedules = sortedSchedules.filter(s => !s.completed);
  const completedSchedules = sortedSchedules.filter(s => s.completed);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Personalized Study Schedule</h1>
          <p className="text-slate-600">Create and manage your personalized study schedule</p>
        </div>

        {/* Add Schedule Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Study Session</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Subject"
              value={newSchedule.subject}
              onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Topic"
              value={newSchedule.topic}
              onChange={(e) => setNewSchedule({ ...newSchedule, topic: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={newSchedule.date}
              onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="time"
              value={newSchedule.startTime}
              onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Start Time"
            />
            <input
              type="time"
              value={newSchedule.endTime}
              onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="End Time"
            />
            <select
              value={newSchedule.priority}
              onChange={(e) => setNewSchedule({ ...newSchedule, priority: e.target.value as 'high' | 'medium' | 'low' })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button
            onClick={addSchedule}
            className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Schedule
          </button>
        </div>

        {/* Upcoming Schedules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Upcoming Sessions</h2>
          {upcomingSchedules.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-center">
              <AlertCircle className="mx-auto mb-4 text-slate-400" size={40} />
              <p className="text-slate-600">No upcoming study sessions. Add one to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{schedule.subject}</h3>
                      <p className="text-slate-600">{schedule.topic}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(schedule.priority)}`}>
                      {schedule.priority.charAt(0).toUpperCase() + schedule.priority.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{new Date(schedule.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleComplete(schedule.id)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-semibold text-sm"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Schedules */}
        {completedSchedules.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Completed Sessions</h2>
            <div className="grid gap-4">
              {completedSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-xl shadow-md p-6 border border-green-200 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 line-through">{schedule.subject}</h3>
                      <p className="text-slate-600">{schedule.topic}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      Completed
                    </span>
                  </div>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedSchedule;
