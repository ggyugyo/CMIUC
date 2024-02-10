import React, { Component } from "react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(viduProps) {
    if (
      this.props.streamManager !== undefined &&
      this.props.streamManager !== viduProps.streamManager &&
      !!this.videoRef.current
    ) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (
      this.props.streamManager !== undefined &&
      this.props.streamManager &&
      !!this.videoRef.current
    ) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <video autoPlay={true} ref={this.videoRef} />;
  }
}
