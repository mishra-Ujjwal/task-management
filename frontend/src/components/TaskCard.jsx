import React from 'react';
import { FiCalendar, FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi';
import styles from './TaskCard.module.css';

const formatDate = (d) => {
  if (!d) return null;
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'done') return false;
  return new Date(dueDate) < new Date();
};

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className={`${styles.card} ${task.status === 'done' ? styles.done : ''} fade-in`}>
      <div className={styles.top}>
        <div className={styles.badges}>
          <span className={`badge badge-${task.status}`}>
            {task.status === 'todo' ? 'Todo' : task.status === 'in-progress' ? 'In Progress' : 'Done'}
          </span>
          <span className={`badge badge-${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        <div className={styles.actions}>
          <button className="btn btn-icon btn-ghost btn-sm" onClick={() => onEdit(task)} title="Edit">
            <FiEdit2 size={13} />
          </button>
          <button className="btn btn-icon btn-sm" style={{ color: 'var(--danger)', background: 'transparent', border: 'none' }} onClick={() => onDelete(task._id)} title="Delete">
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <h4 className={styles.title}>{task.title}</h4>
        {task.description && <p className={styles.desc}>{task.description}</p>}
      </div>

      <div className={styles.footer}>
        {task.dueDate && (
          <span className={`${styles.dueDate} ${overdue ? styles.overdue : ''}`}>
            <FiCalendar size={11} />
            {overdue ? 'Overdue · ' : ''}{formatDate(task.dueDate)}
          </span>
        )}

        <button
          className={`${styles.toggleBtn} ${task.status === 'done' ? styles.toggleDone : ''}`}
          onClick={() => onToggle(task._id)}
          title={task.status === 'done' ? 'Mark incomplete' : 'Mark complete'}
        >
          <FiCheck size={13} />
          {task.status === 'done' ? 'Completed' : 'Mark done'}
        </button>
      </div>
    </div>
  );
}
