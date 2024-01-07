// Inner components
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
// Functional
import fetchImgs from './apiFetch';
// User Components
import Searchbar from 'components/Searchbar/Searchbar';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
// CSS style
import styles from './App.module.css';

Notify.init({
  width: '300px',
  position: 'right-top',
  fontSize: '16px',
});

export default function App() {
  const [state, setState] = useState({
    query: '',
    page: 1,
    hits: [],
    selectedHit: null,
    loadMore: false,
    loader: false,
    isModalShow: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { query, page } = state;

      if (query === '') {
        Notify.warning('Search query is empty.');
        return;
      }

      try {
        setState(prev => ({ ...prev, loader: true }));
        const data = await fetchImgs(query, page);

        if (data.hits && data.hits.length > 0) {
          page === 1 && Notify.success(`We found ${data.totalHits} results`);

          setState(prev => ({
            ...prev,
            hits: [...prev.hits, ...data.hits],
            loadMore: page < Math.ceil(data.totalHits / 12),
          }));
        } else {
          Notify.failure('There are no results for your query.');
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setState(prev => ({ ...prev, loader: false }));
      }
    };

    if (state.query !== '') {
      fetchData();
    }
  }, [state.query, state.page]);

  const handleSearchbarSubmit = newQuery => {
    if (newQuery === state.query) {
      Notify.warning('This query is already used.');
      return;
    }

    setState(prev => ({
      ...prev,
      query: newQuery,
      hits: [],
      page: 1,
      loadMore: false,
    }));
  };

  const handleLoadMoreButton = () => {
    setState(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const handleHitClick = ({ largeImageURL, tags }) => {
    setState(prev => ({ ...prev, selectedHit: { largeImageURL, tags } }));
    toggleModal();
  };

  const toggleModal = () => {
    setState(prev => ({ ...prev, isModalShow: !prev.isModalShow }));
  };

  return (
    <div className={styles['App-div']}>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {state.loader && <Loader />}
      {state.hits.length > 0 && (
        <ImageGallery hits={state.hits} onHitClick={handleHitClick} />
      )}
      {state.isModalShow && (
        <Modal selectedHit={state.selectedHit} hideModal={toggleModal} />
      )}
      {state.loadMore && <LoadMoreBtn onLoadMore={handleLoadMoreButton} />}
    </div>
  );
}
