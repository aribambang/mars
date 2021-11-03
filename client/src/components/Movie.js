import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = (props) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getDataMovie();
  }, []);

  const getDataMovie = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:4000/v1/movie/${props.match.params.id}`);
      response.data.movie.genres
        ? (response.data.movie.genres = Object.values(response.data.movie.genres))
        : (response.data.movie.genres = []);
      setMovie(response.data.movie);

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
      <h2>
        Movie: {movie.title} ({movie.year})
      </h2>
      <div className='float-start'>
        <small>Rating: {movie.mpaa_rating}</small>
      </div>
      <div className='float-end'>
        {movie.genres &&
          movie.genres.length > 0 &&
          movie.genres.map((mg, index) => (
            <span className='badge bg-secondary me-1' key={index}>
              {mg}
            </span>
          ))}
      </div>
      <div className='clearfix'></div>
      <hr />

      <table className='table table-compact table-striped'>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>Title : </strong>
            </td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>
              <strong>Description : </strong>
            </td>
            <td>{movie.description}</td>
          </tr>
          <tr>
            <td>
              <strong>Run Time : </strong>
            </td>
            <td>{movie.runtime}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Movie;
