import React from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        {backdropUrl && <img className="modal-backdrop" src={backdropUrl} alt={movie.title} />}
        <h2>{movie.title}</h2>
        <p><strong>Runtime:</strong> {movie.runtime} min</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(', ')}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
