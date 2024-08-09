import React from 'react';
import styles from './error-page.module.scss';

const ErrorPage: React.FC = () => {
  return (
      <div className={styles.errorPageWrapper}>
        <h2>404 - Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
        <a className={styles.homeLink} href="/">Go back to Home</a>
      </div>
  );
};

export default ErrorPage;