import React from 'react';
import MovieData from './MovieData';
import './Posters.css';

function MovieResults (props) {
    let movies = props.movies;

    return(
        <div className="movie-container">
                {movies.map(movies =>
                    <MovieData movieClicked = {props.movieClicked} key={movies.id} movies={movies} />
                )
            }
        </div>
    );
}

export default MovieResults;