import { Component } from 'react';
import React from 'react';
import App from '../App';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import MoviePage from './MoviePage';
import Spider from './Spider';

class Home extends Component {
  state = {
    movies: [],
    pageNumber: 1,
    trailerUrl: '',
    movieKey: '',
    movieId: '',
    modal: false
  };

  componentDidMount() {
    this.getMovies(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=${
        this.state.pageNumber
      }`
    );
  }

  getMovies = URL => {
    fetch(URL)
      .then(res => res.json())
      .then(data => this.setState({ movies: data }));
  };

  pageChange = pageNumber => {
    this.getMovies(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=${pageNumber}`
    );
    this.setState({ pageNumber });
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
    return (
      <>
        <Navigation
          submitSearch={this.submitSearch}
          searchChangeHandler={this.searchChangeHandler}
          getMovies={this.getMovies}
        />

        <Route
          exact
          path='/'
          render={props => (
            <App
              {...props}
              pageChange={this.pageChange}
              trailerUrl={this.state.trailerUrl}
              playMovie={this.playMovie}
              movieKey={this.state.movieKey}
              movies={this.state.movies.results}
              movieClicked={this.movieClicked}
            />
          )}
        />

        <Route
          exact
          path='/movie/:id'
          render={props => (
            <MoviePage
              {...props}
              movies={this.state.movies.results}
              trailerUrl={this.state.trailerUrl}
              playMovie={this.playMovie}
              movieClicked={this.movieClicked}
              movieKey={this.state.movieKey}
            />
          )}
        />
      </>
    );
  }
}

export default Home;
