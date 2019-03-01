import React from 'react';
import './MoviePage.css';

const MovieRecommendation = props => {
  return (
    <div className='recommended-posters'>
      <img
        src={`http://image.tmdb.org/t/p/w500${props.similar[1].poster_path}`}
        alt='poster'
      />
    </div>
  );
};

export default MovieRecommendation;
