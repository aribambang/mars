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
      console.log(response.data);
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
      <h2>Choose a Movie</h2>
      <ul>
        {genres.length > 0 &&
          genres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/genres/${genre.id}`}>{genre.genre_name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Genres;
