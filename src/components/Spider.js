class Spider {
  constructor() {
    this.key = 'AhWLPUIlhYfa18fg';
  }

  getMovieStream(id) {
    return `https://videospider.stream/personal?key=${
      this.key
    }&video_id=${id}&tmdb=1`;
  }
}
export default Spider;

// First API Key: kSZoH21SOgg1GH07
// Second API Key: AhWLPUIlhYfa18fg
