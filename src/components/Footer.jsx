import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section about">
        <h4>About Flixster</h4>
        <p>
          Flixster is a movie discovery app powered by The Movie Database (TMDb).
          Browse what's now playing, search for your favorite films, and sort by rating,
          release date, or title.
        </p>
      </div>

      <div className="footer-section contact">
        <h4>Contact</h4>
        <p>
          Catch us on GitHub!
          🐙 <a href="https://github.com/pnasciment0/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
