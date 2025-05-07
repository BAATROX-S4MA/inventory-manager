import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setSortBy } from '../inventorySlice';
import '../App.css';

const Search = () => {
  const dispatch = useDispatch();

  return (
    <div className="search-container">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <select
        name="sort"
        id="sort"
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      >
        <option value="default">Sort by</option>
        <option value="name-asc">Name (Ascending)</option>
        <option value="name-desc">Name (Descending)</option>
        <option value="quantity-asc">Quantity (Ascending)</option>
        <option value="quantity-desc">Quantity (Descending)</option>
        <option value="price-asc">Price (Ascending)</option>
        <option value="price-desc">Price (Descending)</option>
      </select>
    </div>
  );
};

export default Search;