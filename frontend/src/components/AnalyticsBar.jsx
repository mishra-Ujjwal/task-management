import React, { useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import styles from './AnalyticsBar.module.css';

export default function AnalyticsBar({ refreshTrigger }) {
  const { analytics, loading, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics, refreshTrigger]);

  if (loading && !analytics) {
    return <div className={styles.wrapper}>Loading analytics...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Overview</h2>
      </div>

      {analytics && (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total</div>
            <div className={styles.statValue}>{analytics.total}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Completed</div>
            <div className={styles.statValue}>{analytics.completed}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>In Progress</div>
            <div className={styles.statValue}>{analytics.inProgress}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statValue}>{analytics.pending}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Overdue</div>
            <div className={styles.statValue}>{analytics.overdue}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Completion</div>
            <div className={styles.statValue}>{analytics.completionPercentage}%</div>
          </div>
        </div>
      )}
    </div>
  );
}
