import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ClipLoader size={50} color="#000" />
    </div>
  );
};

export default Loader;