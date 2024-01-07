import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ selectedHit, hideModal }) {
  const handleEscClick = e => e.code === 'Escape' && hideModal();

  useEffect(() => {
    document.addEventListener('keydown', handleEscClick);
    return () => document.removeEventListener('keydown', handleEscClick);
  }, []);

  return (
    <div className={styles['Overlay']}>
      <div className={styles['Modal']}>
        <img src={selectedHit.largeImageURL} alt={selectedHit.tags} />
      </div>
    </div>
  );
}
