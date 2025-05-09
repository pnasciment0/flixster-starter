import React, { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [sortOption, setSortOption] = useState('rating');

  const handleSearchSubmit = () => {
    setSearchTrigger(true); // flag that user triggered a search
  };


  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <main>
        <MovieList 
          searchQuery={searchQuery}
          searchTrigger={searchTrigger}
          setSearchTrigger={setSearchTrigger}
          sortOption={sortOption}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
