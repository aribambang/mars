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
      if (!response.data.movies) response.data.movies = [];
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
      <div className='list-group'>
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className='list-group-item list-group-item-action'
          >
            {movie.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Movies;
