import React from 'react';
import MovieData from './MovieData';
import './Posters.css';

function MovieResults (props) {
    let movies = props.movies;

    return(
        <div className="movie-container">
                {movies.map(movies =>
                    <MovieData key={movies.title} movies={movies} />
                )
            }}
        </div>
    );
}

export default MovieResults;