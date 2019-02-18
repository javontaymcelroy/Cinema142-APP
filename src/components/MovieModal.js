import React, { Component } from "react";
import './MovieModal.css';

class MovieModal extends Component {
    static defaultProps = {};
    static propTypes = {};
    state = {};

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
          this.props.onClose();
        }
      }

      componentDidMount() {
        if (this.props.onClose) {
          window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
        }
      }

      componentWillUnmount() {
        if (this.props.onClose) {
          window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
        }
      }

      onOverlayClick = () => {
        this.props.onClose();
      }

    render() {
        if (this.props.visable) {
            return (
                <div className="movie-modal" onClick={this.onOverlayClick}>
                    <div className="video-frame">
                        <iframe width="1424" height="815" src={`https://www.youtube-nocookie.com/embed/${this.props.movieKey}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <span></span>
                </div>
            );
        } else {
            return ('');
        }
    }
}

export default MovieModal;