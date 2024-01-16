import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onLoadMore }) {
  return (
    <div className={styles['loadmore-div']}>
      <button className={styles['loadmore-btn']} onClick={onLoadMore}>
        More..
      </button>
    </div>
  );
}
