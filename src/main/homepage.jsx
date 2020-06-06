import React from 'react';
import { Link } from 'react-router-dom';

import './homepage.scss';

const Homepage = () => (
  <div className="Homepage">
    <div className="title-container">
      <div className="homepage-title">VIA</div>
      <div className="homepage-title">STR</div>
      <div className="homepage-title">EAM</div>
    </div>
    <div className="homepage-buttons">
      <p>I'm looking for:</p>
      <div className="buttons">
        <button className="select-btn">
          <Link to="/movies" className="button-link">
            A Movie
          </Link>
        </button>
        <button className="select-btn">
          <Link to="/tv-shows" className="button-link">
            A Tv Show
          </Link>
        </button>
      </div>
      <p>Have you ever wondered which subscription is the best for you?</p>
      <div className="buttons">
        <button className="select-btn">
          <Link to="/subscriptions" className="button-link">
            Help me
          </Link>
        </button>
      </div>
    </div>
  </div>
);

export default Homepage;
