import React, { useState, useEffect } from 'react';

const Movie = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie({
      id: props.match.params.id,
      title: 'some title',
      runtime: 140,
    });
  }, [props]);

  return (
    <>
      <h2>
        Movie: {movie.title} {movie.id}
      </h2>
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
