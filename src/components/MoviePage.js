import React from 'react';
import './MoviePage.css';
import Tilt from 'react-tilt';
import { Component } from 'react';
import Spider from './Spider';
import MovieModal from './MovieModal';
import moment from 'moment';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieKey: '',
      pageNumber: 1,
      movieId: '',
      trailerUrl: '',
      name: '',
      modal: false,
      reviews: []
    };
  }

  // componentDidMount() {
  //   console.log(this.props.match.params.id);
  //   this.getReviews(
  //     `https://api.themoviedb.org/3/movie/${
  //       this.props.match.params.id
  //     }/reviews?page=1&language=en-US&api_key=6d9a91a4158b0a021d546ccd83d3f52e`
  //   );
  // }

  // getReviews = URL => {
  //   fetch(URL)
  //     .then(res => res.json())
  //     .then(data => this.setState({ reviews: data.results }));
  // };

  movieClicked = movieId => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6d9a91a4158b0a021d546ccd83d3f52e`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          movieKey: data.results[0].key,
          movieId: movieId,
          modal: true,
          trailerUrl: `https://www.youtube.com/embed/${data.results[0].key}`
        })
      );
  };

  playMovie = () => {
    let url = new Spider().getMovieStream(this.state.movieId);
    this.setState({ trailerUrl: url, modal: true });
  };

  onOverlayClick = () => {
    this.props.onClose();
  };

  onClose = () => {
    this.setState({ modal: false });
  };

  render() {
    window.scroll(0, 0);
    //   debugger;
    let id = this.props.match.params.id;
    let movie = {};
    if (this.props.movies) {
      movie = this.props.movies.filter(
        movieObj => movieObj.id.toString() === id
      );
    }
    let src = '';
    let poster = '';
    if (movie && movie.length > 0) {
      src = 'http://image.tmdb.org/t/p/original' + movie[0].backdrop_path;
      poster = 'http://image.tmdb.org/t/p/original' + movie[0].poster_path;

      return (
        <div className='moviepage-body'>
          <div className='movie-header'>
            <Tilt
              className='Tilt'
              options={{ max: 10, scale: 1, perspective: 1000 }}
            >
              <img className='poster' src={poster} alt='movie poster' />
            </Tilt>
            <div className='movie-header-text'>
              <h1>{movie ? `${movie[0].title}` : ''}</h1>
              <div className='date-vote'>
                <p className='release-date'>
                  {movie
                    ? `${moment(movie[0].release_date, 'YYYY-MM-DD').format(
                        'LL'
                      )}`
                    : ''}
                </p>
                <p className='vote'>
                  | {movie ? `${movie[0].vote_average}` : ''} / 10
                </p>
              </div>
              <p className='movie-overview'>
                {movie ? `${movie[0].overview}` : ''}
              </p>
              <div className='moviepage-buttons'>
                <button
                  className='movie-page-btn'
                  onClick={() => this.movieClicked(movie[0].id)}
                >
                  <i className='icon ion-md-play' />
                  Watch trailer
                </button>
              </div>
            </div>
          </div>
          <span class='overlay' />
          <img className='page-hero-background' src={src} alt='movie poster' />
          <MovieModal
            visable={this.state.modal}
            movieKey={this.state.movieKey}
            onClose={this.onClose}
            trailerUrl={this.state.trailerUrl}
            playMovie={this.playMovie}
            movieClicked={this.movieClicked}
            movie={movie}
          />
        </div>
      );
    } else return '';
  }
}

export default MoviePage;

// adult:
// false
// backdrop_path:
// "/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg"
// genre_ids:
// Array[5]
// id:
// 324857
// original_language:
// "en"
// original_title:
// "Spider-Man: Into the Spider-Verse"
// overview:
// "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to …"
// popularity:
// 248.334
// poster_path:
// "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"
// release_date:
// "2018-12-07"
// title:
// "Spider-Man: Into the Spider-Verse"

// video:
// false
// vote_average:
// 8.5
// vote_count:
// 1959
