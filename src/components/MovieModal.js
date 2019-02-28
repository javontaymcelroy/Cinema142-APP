import React, { Component } from 'react';
import './MovieModal.css';

class MovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
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
      window.removeEventListener(
        'keydown',
        this.listenKeyboard.bind(this),
        true
      );
    }
  }

  onOverlayClick = () => {
    this.props.onClose();
  };

  onClose = () => {
    this.setState({ modal: false });
  };

  render() {
    if (this.props.visable) {
      return (
        <div className='movie-modal'>
          <div className='video-frame'>
            <button className='movie-page-btn' onClick={this.props.playMovie}>
              Watch movie
            </button>
            <iframe
              width='1920'
              height='1080'
              title='movie trailer'
              src={this.props.trailerUrl}
              frameBorder='0'
              allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
              autoPlay='1'
              allowfullScreen='1'
            />
            <i class='icon ion-md-contract' onClick={this.onOverlayClick} />
          </div>
          <span />
        </div>
      );
    } else {
      return '';
    }
  }
}

export default MovieModal;
