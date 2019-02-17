import React from 'react';
import  './Posters.css';

const MovieData = props => {
    return (
        <div className="poster-container">
            <div className="posters">
                <img className="posters-img" src={`http://image.tmdb.org/t/p/original${props.movies.poster_path}`} alt="posters" />
                {/*<h1>{props.movies.title}</h1>*/}
            </div>
        </div>
    );
}


export default MovieData;

// results.forEach((movie) -> {
//     movie.poster_src = "http://image.tmdb.org/t/p/original" + movie.poster_path
// })
// Get Movie trailer:
// http://api.themoviedb.org/3/movie/157336/videos?api_key=###


// Get movie details and videos:
// http://api.themoviedb.org/3/movie/157336?api_key=###&append_to_response=videos