import { useState } from 'react';
import { Notify } from 'notiflix';

import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Notify.warning('Please write a search query.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles['Searchbar']}>
      <form className={styles['SearchForm']} onSubmit={handleSubmit}>
        <button className={styles['SearchForm-button']} type="submit">
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
