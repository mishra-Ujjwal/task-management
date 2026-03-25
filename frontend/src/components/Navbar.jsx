import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.brandName}>Task Management</span>
      </div>
      <div className={styles.right}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user?.name?.charAt(0).toUpperCase()}</div>
          <span className={styles.userName}>{user?.name}</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={logout}>
          <FiLogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
