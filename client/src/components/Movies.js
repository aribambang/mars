import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies([
      { id: 1, title: 'Movie 1', runtime: 142 },
      { id: 2, title: 'Movie 2', runtime: 175 },
      { id: 3, title: 'Movie 3', runtime: 120 },
    ]);
  }, []);
  return (
    <>
      <h2>Choose a Movie</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
