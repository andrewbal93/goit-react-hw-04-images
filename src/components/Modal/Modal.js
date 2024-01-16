import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ selectedHit, hideModal }) {
  useEffect(() => {
    const handleEscClick = e => e.code === 'Escape' && hideModal();
    document.addEventListener('keydown', handleEscClick);
    return () => document.removeEventListener('keydown', handleEscClick);
  }, [hideModal]);

  const handleOverlayClick = () => {
    hideModal();
  };
  const handleModalClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={styles['Overlay']} onClick={handleOverlayClick}>
      <div className={styles['Modal']} onClick={handleModalClick}>
        <img src={selectedHit.largeImageURL} alt={selectedHit.tags} />
      </div>
    </div>
  );
}
