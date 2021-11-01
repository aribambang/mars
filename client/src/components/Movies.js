import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getDataMovies();
  }, []);

  const getDataMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4000/v1/movies');
      setMovies(response.data.movies);
      setIsLoading(false);
    } catch (err) {
      setError('Invalid response code: ' + err.response.status);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : error ? (
    <>Error: {error}</>
  ) : (
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
