import React, { useEffect, useState, useRef } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import './MovieList.css'; 

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieList = ({ searchQuery, searchTrigger, setSearchTrigger, sortOption }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const fetchedPages = useRef(new Set());
  const lastQuery = useRef('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      if (isSearchMode) {
        setIsSearchMode(false);
        setMovies([]);
        setPage(1);
        setHasMore(true);
        fetchedPages.current.clear();
      }
    } else if (searchQuery !== lastQuery.current || searchTrigger) {
      setIsSearchMode(true);
      lastQuery.current = searchQuery;
      setSearchTrigger(false);
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery, searchTrigger, setSearchTrigger]);

  useEffect(() => {
    if (!isSearchMode && !fetchedPages.current.has(page)) {
      fetchNowPlaying(page);
      fetchedPages.current.add(page);
    }
  }, [page, isSearchMode]);

  useEffect(() => {
    if (sortOption) {
      const sortedMovies = [...movies];
      sortedMovies.sort((a, b) => {
        if (sortOption === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortOption === 'release') {
          return new Date(b.release_date) - new Date(a.release_date);
        } else if (sortOption === 'rating') {
          return b.vote_average - a.vote_average;
        }
        return 0;
      });
      setMovies(sortedMovies);
    }
  }, [sortOption]);

  const fetchNowPlaying = async (pageToFetch) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageToFetch}`
      );
      const data = await response.json();
      if (data.results.length === 0 || pageToFetch >= data.total_pages) {
        setHasMore(false);
      }
      setMovies((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    setMovies([]);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMovies(data.results || []);
      setHasMore(false);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading && !isSearchMode) {
      setPage((prev) => prev + 1);
    }
  };

  const handleCardClick = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-list-wrapper">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
            onClick={() => handleCardClick(movie.id)}
          />
        ))}
      </div>

      {isLoading && <div className="loading-spinner">Loading...</div>}

      {!isLoading && movies.length === 0 && (
        <p className="end-message">No movies found. Try another search!</p>
      )}

      {!isSearchMode && hasMore && !isLoading && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MovieList;
