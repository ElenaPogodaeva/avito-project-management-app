import React from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../../redux/hooks';
import style from './Search.module.scss';
import { searchByName } from '../../redux/tasksSlice';
import { fetchTasks } from '../../redux/thunks';

function Search() {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      dispatch(fetchTasks());
    } else {
      dispatch(searchByName(value));
    }
  };

  const debouncedChange = debounce(handleChange, 500);

  return (
    <div className={style.searchOptions}>
      <input
        type="text"
        className={`input ${style.searchInput}`}
        name="searchValue"
        onChange={debouncedChange}
        placeholder="Поиск по названию задачи"
      />
    </div>
  );
}

export default Search;
