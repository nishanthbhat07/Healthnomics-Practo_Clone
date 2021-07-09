import React from "react";
import PropTypes from 'prop-types';
import Glide from '@glidejs/glide'
import { getDirection } from "../../helpers/Utils";
import "@glidejs/glide/dist/css/glide.core.min.css";

let resizeTimeOut = -1;
let mountTimeOut = -1;

export default class GlideComponent extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      type: PropTypes.string,
      startAt: PropTypes.number,
      perView: PropTypes.number,
      focusAt: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      gap: PropTypes.number,
      autoplay: PropTypes.bool,
      hoverpause: PropTypes.bool,
      keyboard: PropTypes.bool,
      bound: PropTypes.bool,
      swipeThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
      dragThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
      perTouch: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
      touchRatio: PropTypes.number,
      touchAngle: PropTypes.number,
      animationDuration: PropTypes.number,
      rewind: PropTypes.bool,
      rewindDuration: PropTypes.number,
      animationTimingFunc: PropTypes.string,
      direction: PropTypes.string,
      peek: PropTypes.object,
      breakpoints: PropTypes.object,
      classes: PropTypes.object,
      throttle: PropTypes.number
    }),
    id: PropTypes.string,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.renderDots = this.renderDots.bind(this);
    this.state = {
      total: React.Children.count(this.props.children)
    };
  }

  componentDidMount() {
    this.glideCarousel = new Glide(this.carousel, {...this.props.settings, direction: getDirection().direction});
    this.glideCarousel.mount();
    mountTimeOut = setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
      this.glideCarousel.on("resize", this.onResize);
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(resizeTimeOut);
    clearTimeout(mountTimeOut);
    this.glideCarousel.destroy();
  }

  onResize() {
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(() => {
      this.glideCarousel.update();
      resizeTimeOut = -1;
    }, 500);
  }

  renderDots() {
    let dots = [];
    for (let i = 0; i < this.state.total; i++) {
      dots.push(
        <button className="glide__bullet slider-dot" key={i} data-glide-dir={"="+i}></button>
      );
    }
    return dots;
  }

  render() {
    return (
      <div>
        <div className="glide" ref={node => this.carousel = node}>
          <div data-glide-el="track" className="glide__track">
            <div className="glide__slides">
              {this.props.children}
            </div>
          </div>
          {
            !this.props.settings.hideNav &&  (
              <div className="glide__arrows slider-nav" data-glide-el="controls">
              <button className="glide__arrow glide__arrow--left left-arrow btn btn-link" data-glide-dir="<">
                <i className="simple-icon-arrow-left"></i>
              </button>
  
              <div className="glide__bullets slider-dot-container" data-glide-el="controls[nav]">
                {this.renderDots()}
              </div>
              
              <button className="glide__arrow glide__arrow--right right-arrow btn btn-link" data-glide-dir=">">
                <i className="simple-icon-arrow-right"></i>
              </button>
            </div>
            )
          }
        </div>
      </div>
    )
  }
}
