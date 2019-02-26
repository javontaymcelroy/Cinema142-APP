import React from 'react';
import './Posters.css';
import MovieModal from './MovieModal';
import Tilt from 'react-tilt';

console.log(MovieModal);

const MovieData = props => {
  return (
    <div className='poster-container'>
      <div className='posters'>
        <Tilt
          className='Tilt'
          options={{ max: 15, scale: 1, glare: true, maxGlare: 1 }}
        >
          <div className='Tilt-inner'>
            <img
              className='posters-img'
              src={`http://image.tmdb.org/t/p/w500${props.movies.poster_path}`}
              alt='posters'
              onClick={() => props.movieClicked(props.movies.id)}
            />
          </div>
        </Tilt>
        <MovieModal movies={props.movies} key={props.movies.id} />
      </div>
    </div>
  );
};

export default MovieData;

// Get Movie trailer:
// http://api.themoviedb.org/3/movie/157336/videos?api_key=###

// Get movie details and videos:
// http://api.themoviedb.org/3/movie/157336?api_key=###&append_to_response=videos
