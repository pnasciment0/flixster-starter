import React from 'react';
import './Header.css';

const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearchSubmit, 
  sortOption, 
  setSortOption 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  return (
    <header className="header">
      <h1>Flixster</h1>
      <div className="controls">
        <div className="search-bar">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie..." 
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
            <option value="release">Release Date</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
