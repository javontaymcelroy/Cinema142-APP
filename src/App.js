import React from 'react';
import './App.css';
import MovieResults from './components/MovieResults';
// import MovieModal from './components/MovieModal';
import Spider from './components/Spider';
import MovieModal from './components/MovieModal';
import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies,
      modal: false,
      movieKey: '',
      search: '',
      title: 'Browse Movies',
      pageNumber: 1,
      movieId: '',
      trailerUrl: '',
      name: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies
    });
  }

  pageChange = event => {
    // debugger;
    if (event.target.name === 'next') {
      this.props.pageChange(this.state.pageNumber + 1);
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    } else {
      this.props.pageChange(this.state.pageNumber - 1);
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  };

  onClose = () => {
    this.setState({ modal: false });
  };

  movieClicked = movieId => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6d9a91a4158b0a021d546ccd83d3f52e`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          modal: true,
          movieKey: data.results[0].key,
          movieId: movieId,
          trailerUrl: `https://www.youtube.com/embed/${data.results[0].key}`
        })
      );
  };

  playMovie = () => {
    let url = new Spider().getMovieStream(this.state.movieId);
    this.setState({ trailerUrl: url });
  };

  searchChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ search: event.target.value });
  };

  submitSearch = event => {
    event.preventDefault();

    let query = `https://api.themoviedb.org/3/search/movie?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&query=${
      this.state.search
    }&page=1&include_adult=false`;

    if (this.state.search === '') {
      query =
        'https://api.themoviedb.org/3/movie/popular?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=1';
      this.setState({ title: 'Browse Movies', pageNumber: 1 });
    } else {
      this.setState({ title: this.state.search });
    }

    this.getMovies(query);
  };

  render() {
    window.scroll(0, 0);
    const movies = this.state.movies;
    let src = '';
    if (movies && movies.length > 0) {
      src = 'http://image.tmdb.org/t/p/original' + movies[0].backdrop_path;

      return (
        <div className='App'>
          <div className='hero-info'>
            <h2 className='hero-data'>{movies[0].vote_average} / 10</h2>
            <h1 className='hero-title'>{movies[0].title}</h1>
            <p className='hero-overview'>{movies[0].overview}</p>
            <p className='release-date'>
              {`${moment(movies[0].release_date, 'YYYY-MM-DD').format('LL')}`}
            </p>
            <button
              className='hero-btn'
              onClick={() => this.movieClicked(movies[0].id)}
            >
              <i className='icon ion-md-play' />
              Watch trailer
            </button>
          </div>

          <img
            className='hero'
            src={src}
            alt='poster'
            onClick={() => this.movieClicked(movies[0].id)}
          />

          <img className='hero-background' src={src} alt='poster' />

          <div className='Top-Trending'>
            <div className='trending-bar'>
              <div className='trending-title'>
                <h1>{this.state.title}</h1>
                <i className='icon ion-md-film' />
              </div>
            </div>

            <MovieModal
              visable={this.state.modal}
              movieKey={this.state.movieKey}
              onClose={this.onClose}
              trailerUrl={this.state.trailerUrl}
              playMovie={this.playMovie}
              movieClicked={this.movieClicked}
              movies={movies}
            />
            <MovieResults movieClicked={this.movieClicked} movies={movies} />
            <div className='page-buttons'>
              <button
                name='back'
                className='page-btn'
                onClick={this.pageChange}
                disabled={this.state.pageNumber === 1}
              >
                Prev Page
              </button>
              <button
                name='next'
                className='page-btn'
                onClick={this.pageChange}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      );
    } else return '';
  }
}

export default App;
