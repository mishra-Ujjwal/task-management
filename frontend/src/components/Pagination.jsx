import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Pagination.module.css';

export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages, total } = pagination;
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className={styles.wrapper}>
      <span className={styles.info}>{total} task{total !== 1 ? 's' : ''}</span>
      <div className={styles.controls}>
        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          <FiChevronLeft size={14} />
        </button>
        {pages.map(p => (
          <button key={p} className={`btn btn-sm btn-icon ${p === page ? styles.active : 'btn-ghost'}`} onClick={() => onPageChange(p)}>
            {p}
          </button>
        ))}
        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
