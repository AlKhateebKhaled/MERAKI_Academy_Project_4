import React from "react";
import "./style.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Football Shirts Store</h1>
      <p>Shop the latest men's shirts from your favorite leagues!</p>

      <h2>Featured Leagues</h2>
      <div className="league-container">
        <div className="league-card">
          <h3>Serie A</h3>
          <img src="path/to/serie-a-shirt.jpg" alt="Serie A Shirt" />
          <button>Shop Serie A</button>
        </div>
        <div className="league-card">
          <h3>Premier League</h3>
          <img
            src="path/to/premier-league-shirt.jpg"
            alt="Premier League Shirt"
          />
          <button>Shop Premier League</button>
        </div>
        <div className="league-card">
          <h3>La Liga</h3>
          <img src="path/to/la-liga-shirt.jpg" alt="La Liga Shirt" />
          <button>Shop La Liga</button>
        </div>
        <div className="league-card">
          <h3>Bundesliga</h3>
          <img src="path/to/bundesliga-shirt.jpg" alt="Bundesliga Shirt" />
          <button>Shop Bundesliga</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
