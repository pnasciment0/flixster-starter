import React from 'react';
import './MovieCard.css'; 

const MovieCard = ({ title, posterPath, rating, onClick }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-card" onClick={onClick} role="button" tabIndex={0}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
    </div>
  );
};


export default MovieCard;
