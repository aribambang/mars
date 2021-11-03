import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getDataMovies();
  }, []);

  const getDataMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4000/v1/genres');
      setGenres(response.data.genres);
      setIsLoading(false);
    } catch (err) {
      setError('Invalid response code: ' + err.response?.status);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : error ? (
    <>Error: {error}</>
  ) : (
    <>
      <h2>Genres</h2>
      <div className='list-group'>
        {genres.length > 0 &&
          genres.map((genre) => (
            <Link
              key={genre.id}
              to={{ pathname: `/genre/${genre.id}`, genreName: genre.genre_name }}
              className='list-group-item list-group-item-action'
            >
              {genre.genre_name}
            </Link>
          ))}
      </div>
    </>
  );
};

export default Genres;
