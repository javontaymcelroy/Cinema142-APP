class Spider {
  constructor() {
    this.key = 'kSZoH21SOgg1GH07';
  }

  getMovieStream(id) {
    return `https://videospider.stream/personal?key=${
      this.key
    }&video_id=${id}&tmdb=1`;
  }
}
export default Spider;
