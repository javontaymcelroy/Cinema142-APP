import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import MovieResults from './components/MovieResults'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  searchChangeHandler = event => {
    console.log(event.target.value);
  };

  componentDidMount() {
    this.getMovies('https://api.themoviedb.org/3/movie/popular?api_key=6d9a91a4158b0a021d546ccd83d3f52e&language=en-US&page=4');
  }

  getMovies = URL => {

    fetch(URL)
      .then(res => res.json())
      .then(data => this.setState({ movies: data }))
  };

  render() {
    const movies = this.state.movies.results;
    console.log(this.state.movies.results)
    let src = '';
    if ( movies ) {
      src= "http://image.tmdb.org/t/p/original" + movies[0].backdrop_path;

      return (
        <div className="App">
        <Navigation />
        <div className="hero-info">
          <h1 className="hero-title">{movies[0].title}</h1>
          <p className="hero-overview">{movies[0].overview}</p>
          <button className="hero-btn">Watch trailer</button>
        </div>

        <img className="hero" src={src} alt="poster"/>
        <div className="Top-Trending">
          <div className="trending-bar">
            <div className="trending-title">
              <h1>Top Trending</h1>
              <i className="icon ion-md-flame"></i>
            </div>
            <div className="Genre-btns">
              <button>Action</button>
              <button>Horror</button>
              <button>Comedy</button>
              <button>Drama</button>
              <button>Animation</button>
              <button>Romance</button>
              <button>Documentary</button>
            </div>
          </div>
          <MovieResults movies = {movies} />
        </div>
        <div className="browse">
          <img src={`http://image.tmdb.org/t/p/original${movies[4].backdrop_path}`} alt="backdrop" />
        </div>
        <img className="hero-background" src={src} alt="poster"/>
        </div>
      );
    } else return('');
  }
}

export default App;