import React from 'react';
import videojs from 'video.js'
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div>    
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } poster={"/assets/img/detail-1.jpg"} className={this.props.className || ""}></video>
        </div>
      </div>
    )
  }
}