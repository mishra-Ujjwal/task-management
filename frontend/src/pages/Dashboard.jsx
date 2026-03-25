import React, { useState, useEffect, useCallback } from 'react';
import { FiArrowDown, FiArrowUp, FiBarChart2, FiCheckSquare, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import AnalyticsBar from '../components/AnalyticsBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Pagination from '../components/Pagination';
import { useTasks } from '../hooks/useTasks';
import styles from './Dashboard.module.css';

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];

export default function Dashboard() {
  const { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleComplete } = useTasks();

  const [filters, setFilters] = useState({ status: '', priority: '', search: '', sortBy: 'createdAt', order: 'desc', page: 1 });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [analyticsKey, setAnalyticsKey] = useState(0);
  const [showMobileAnalytics, setShowMobileAnalytics] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = useCallback(() => {
    fetchTasks({ ...filters });
  }, [fetchTasks, filters]);

  useEffect(() => { load(); }, [load]);

  const refresh = () => {
    load();
    setAnalyticsKey(k => k + 1);
  };

  const handleSave = async (data) => {
    if (editingTask) {
      await updateTask(editingTask._id, data);
    } else {
      await createTask(data);
    }
    refresh();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setDeleteConfirm(null);
    refresh();
  };

  const handleToggle = async (id) => {
    await toggleComplete(id);
    refresh();
  };

  const handleFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: val, page: 1 }));
  };

  const openCreate = () => { setEditingTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setModalOpen(true); };

  return (
    <div className={`${styles.page} app-shell`}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.mobileAnalyticsToggle}>
          <button
            className="btn btn-ghost"
            onClick={() => setShowMobileAnalytics((open) => !open)}
            type="button"
          >
            {showMobileAnalytics ? <FiX size={16} /> : <FiBarChart2 size={16} />}
            {showMobileAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </button>
        </div>

        {/* Analytics */}
        <div className={`${styles.analyticsSection} ${showMobileAnalytics ? styles.analyticsOpen : ''}`}>
          <AnalyticsBar refreshTrigger={analyticsKey} />
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.controlsLeft}>
            <div className={styles.searchWrap}>
              <FiSearch className={styles.searchIcon} size={14} />
              <input
                className={`form-input ${styles.search}`}
                placeholder="Search tasks..."
                value={filters.search}
                onChange={e => handleFilter('search', e.target.value)}
              />
            </div>

            <div className={styles.selectWrap}>
              <select className="form-select" value={filters.status} onChange={e => handleFilter('status', e.target.value)}>
                <option value="">All Status</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className={styles.selectWrap}>
              <select className="form-select" value={filters.priority} onChange={e => handleFilter('priority', e.target.value)}>
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className={styles.controlsRight}>
            <div className={styles.selectWrap}>
              <select className="form-select" value={filters.sortBy} onChange={e => handleFilter('sortBy', e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <button
              className={`btn btn-ghost btn-sm btn-icon`}
              onClick={() => handleFilter('order', filters.order === 'desc' ? 'asc' : 'desc')}
              title={filters.order === 'desc' ? 'Descending' : 'Ascending'}
            >
              {filters.order === 'desc' ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
            </button>

            <button className="btn btn-primary" onClick={openCreate}>
              <FiPlus size={14} />
              New Task
            </button>
          </div>
        </div>

        {/* Task Grid */}
        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className={styles.skeletonGrid}>
            {[...Array(6)].map((_, i) => <div key={i} className={styles.skeletonCard} />)}
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <FiCheckSquare size={48} />
            <h3>{filters.search || filters.status || filters.priority ? 'No tasks match your filters' : 'No tasks yet'}</h3>
            <p>{filters.search || filters.status || filters.priority ? 'Try adjusting your search or filters' : 'Create your first task to get started'}</p>
            {!filters.search && !filters.status && !filters.priority && (
              <button className="btn btn-primary" onClick={openCreate} style={{ marginTop: 8 }}>Create Task</button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.taskGrid}>
              {tasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={openEdit}
                  onDelete={(id) => setDeleteConfirm(id)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
            <Pagination pagination={pagination} onPageChange={(p) => handleFilter('page', p)} />
          </>
        )}
      </main>

      {/* Task Modal */}
      {modalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingTask(null); }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className={styles.confirmOverlay} onClick={() => setDeleteConfirm(null)}>
          <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
            <h4>Delete Task?</h4>
            <p>This action cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
