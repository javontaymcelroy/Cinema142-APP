import React, { Component } from "react";
import './MovieModal.css';


class MovieModal extends Component {

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
                        <iframe width="1424" height="815" title="movie trailer" src={this.props.trailerUrl} frameborder="0" allow="accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <button className="playmovie-btn" onClick={this.props.playMovie}>Watch movie</button>
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
