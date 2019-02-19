import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import MovieResults from './components/MovieResults';
import MovieModal from './components/MovieModal';
import Spider from './components/Spider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      modal: false,
      movieKey: '',
      search: '',
      title: 'Browse Movies',
      pageNumber: 1,
      movieId: '',
      trailerUrl: '',
    };

  }

  componentDidMount() {
    this.getMovies(`https://api.themoviedb.org/3/trending/movie/day?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=${this.state.pageNumber}`);
  }

  pageChange = event => {
    if (event.target.name === 'next') {
      let pageNumber = this.state.pageNumber+1;
      this.getMovies(`https://api.themoviedb.org/3/trending/movie/day?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=${pageNumber}`);
      this.setState ({ pageNumber: this.state.pageNumber+1 })
    } else {
      let pageNumber = this.state.pageNumber-1;
      this.getMovies(`https://api.themoviedb.org/3/trending/movie/day?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=${pageNumber}`);
      this.setState ({ pageNumber: this.state.pageNumber-1 })
    }
  }

  onClose = () => {
    this.setState ({modal: false})
  }

  movieClicked = movieId => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6d9a91a4158b0a021d546ccd83d3f52e`)
      .then(res => res.json())
      .then(data => this.setState({
        modal: true ,
        movieKey: data.results[0].key,
        movieId: movieId,
        trailerUrl: `https://www.youtube-nocookie.com/embed/${data.results[0].key}`}));
  }

  playMovie = () => {
    let url = new Spider().getMovieStream(this.state.movieId);
    this.setState({trailerUrl: url})
}

  searchChangeHandler = event => {
    console.log(event.target.value);
    this.setState ({ search: event.target.value })
  };

  submitSearch = event => {
    event.preventDefault();

    let query = `https://api.themoviedb.org/3/search/movie?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&query=${this.state.search}&page=1&include_adult=false`;

    if (this.state.search === '') {
      query = 'https://api.themoviedb.org/3/movie/popular?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=1';
      this.setState({ title: 'Browse Movies', pageNumber: 1})
    } else {
      this.setState ({ title: this.state.search });
    }

    this.getMovies(query)
  }

  getMovies = URL => {


    fetch(URL)
      .then(res => res.json())
      .then(data => this.setState({ movies: data }))
  };


  render() {
    const movies = this.state.movies.results;
    let src = '';
    if ( movies ) {
      src= "http://image.tmdb.org/t/p/original" + movies[0].backdrop_path;

      return (
        <div className="App">

        <Navigation submitSearch={this.submitSearch} searchChangeHandler={this.searchChangeHandler} />

        <div className="hero-info">
          <h1 className="hero-title">{movies[0].title}</h1>
          <p className="hero-overview">{movies[0].overview}</p>
          <button className="hero-btn" onClick={()=> this.movieClicked(movies[0].id)}><i className="icon ion-md-play"></i>Watch trailer</button>
        </div>

        <img className="hero" src={src} alt="poster" onClick={()=> this.movieClicked(movies[0].id)}/>

        <img className="hero-background" src={src} alt="poster"/>

        <div className="Top-Trending">
          <div className="trending-bar">
            <div className="trending-title">
              <h1>{this.state.title}</h1>
              <i className="icon ion-md-film"></i>
            </div>
          </div>
          <MovieModal visable={this.state.modal} movieKey={this.state.movieKey} onClose={this.onClose} trailerUrl={this.state.trailerUrl} playMovie={this.playMovie} />
          <MovieResults movieClicked = {this.movieClicked} movies = {movies} />
          <div className="page-buttons">
            <button name="back" className="page-btn" onClick={this.pageChange} disabled={this.state.pageNumber === 1}>Prev Page</button>
            <button name="next" className="page-btn" onClick={this.pageChange}>Next Page</button>
          </div>
        </div>
        </div>
      );
    } else return('');
  }
}

export default App;